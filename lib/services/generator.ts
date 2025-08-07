import { 
  Course, 
  Timetable, 
  UserSettings, 
  GenerationResult, 
  SelectedCourse, 
  ValidationResult,
  GenerationMode 
} from '@/types';
import { v4 as uuidv4 } from 'uuid';

export class SimpleTimetableGenerator {
  /**
   * メイン生成メソッド
   */
  generate(settings: UserSettings, courses: Course[]): GenerationResult {
    const patterns: Timetable[] = [];
    
    // 3つの異なるパターンを生成
    for (let i = 0; i < 3; i++) {
      const pattern = this.generatePattern(
        settings,
        courses,
        i // シード値として使用
      );
      patterns.push(pattern);
    }
    
    return {
      patterns,
      metadata: this.calculateMetadata(patterns[0])
    };
  }
  
  /**
   * 1つのパターンを生成
   */
  private generatePattern(
    settings: UserSettings,
    courses: Course[],
    seed: number
  ): Timetable {
    const selected: SelectedCourse[] = [];
    const usedSlots = new Set<string>();
    let totalCredits = 0;
    
    // 1. 必修科目を配置
    const requiredCourses = courses.filter(c => c.type === 'required');
    for (const course of requiredCourses) {
      const result = this.tryPlaceCourse(course, usedSlots, settings);
      if (result) {
        selected.push(result);
        totalCredits += course.credits;
        // 使用したスロットを記録
        const schedule = course.schedules[result.scheduleIndex];
        usedSlots.add(`${schedule.day}-${schedule.period}`);
      }
    }
    
    // 2. 選択科目を配置（モードに応じた優先順位）
    const electiveCourses = this.sortByMode(
      courses.filter(c => c.type === 'elective'),
      settings.preferredMode,
      seed
    );
    
    for (const course of electiveCourses) {
      if (totalCredits >= settings.requiredCredits) break;
      
      const result = this.tryPlaceCourse(course, usedSlots, settings);
      if (result) {
        selected.push(result);
        totalCredits += course.credits;
        // 使用したスロットを記録
        const schedule = course.schedules[result.scheduleIndex];
        usedSlots.add(`${schedule.day}-${schedule.period}`);
      }
    }
    
    return this.createTimetable(selected, totalCredits);
  }
  
  /**
   * 授業を配置しようと試みる
   */
  private tryPlaceCourse(
    course: Course,
    usedSlots: Set<string>,
    settings: UserSettings
  ): SelectedCourse | null {
    // 各スケジュールをチェック
    for (let i = 0; i < course.schedules.length; i++) {
      const schedule = course.schedules[i];
      if (this.canPlaceSchedule(schedule, usedSlots, settings)) {
        return {
          courseId: course.id,
          scheduleIndex: i
        };
      }
    }
    return null;
  }
  
  /**
   * 特定のスケジュールが配置可能かチェック
   */
  private canPlaceSchedule(
    schedule: { day: number; period: number },
    usedSlots: Set<string>,
    settings: UserSettings
  ): boolean {
    const slotKey = `${schedule.day}-${schedule.period}`;
    
    // 時間の重複チェック
    if (usedSlots.has(slotKey)) return false;
    
    // NG時間帯チェック
    if (settings.ngSlots.some(ng => 
      ng.day === schedule.day && ng.period === schedule.period
    )) return false;
    
    // 1日の最大コマ数チェック
    const daySlots = Array.from(usedSlots)
      .filter(slot => slot.startsWith(`${schedule.day}-`))
      .length;
    if (daySlots >= settings.maxClassesPerDay) return false;
    
    return true;
  }
  
  /**
   * モードに応じたソート
   */
  private sortByMode(
    courses: Course[],
    mode: GenerationMode,
    seed: number
  ): Course[] {
    // シード値を使ってランダム性を制御
    const pseudoRandom = (index: number) => {
      const x = Math.sin(seed + index) * 10000;
      return x - Math.floor(x);
    };
    
    const shuffled = [...courses].sort((a, b) => {
      const indexA = courses.indexOf(a);
      const indexB = courses.indexOf(b);
      return pseudoRandom(indexA) - pseudoRandom(indexB);
    });
    
    switch (mode) {
      case 'morning':
        return shuffled.sort((a, b) => {
          const aPeriod = Math.min(...a.schedules.map(s => s.period));
          const bPeriod = Math.min(...b.schedules.map(s => s.period));
          return aPeriod - bPeriod;
        });
      
      case 'afternoon':
        return shuffled.sort((a, b) => {
          const aPeriod = Math.max(...a.schedules.map(s => s.period));
          const bPeriod = Math.max(...b.schedules.map(s => s.period));
          return bPeriod - aPeriod;
        });
      
      case 'minimal':
        // 連続した時間に配置して空きコマを減らす
        // 難易度の高い科目を優先
        return shuffled.sort((a, b) => {
          const difficultyOrder = { hard: 0, normal: 1, easy: 2 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        });
      
      case 'balanced':
      default:
        return shuffled;
    }
  }
  
  /**
   * 時間割オブジェクトを作成
   */
  private createTimetable(
    courses: SelectedCourse[],
    totalCredits: number
  ): Timetable {
    const now = new Date().toISOString();
    return {
      id: uuidv4(),
      name: `時間割 ${new Date().toLocaleDateString('ja-JP')}`,
      semester: '2024年前期',
      courses,
      totalCredits,
      createdAt: now,
      updatedAt: now
    };
  }
  
  /**
   * メタデータを計算
   */
  private calculateMetadata(timetable: Timetable, courses?: Course[]) {
    // 仮のメタデータを返す（実際の実装はストアで行う）
    return {
      totalCredits: timetable.totalCredits,
      requiredCourses: 0,
      electiveCourses: 0,
      emptySlots: 0,
      score: timetable.totalCredits * 10
    };
  }
  
  /**
   * 制約条件のバリデーション
   */
  validateConstraints(
    timetable: Timetable,
    settings: UserSettings
  ): ValidationResult {
    const errors: string[] = [];
    
    // 必要単位数チェック
    if (timetable.totalCredits < settings.requiredCredits) {
      errors.push(
        `必要単位数が不足しています（現在: ${timetable.totalCredits}単位、必要: ${settings.requiredCredits}単位）`
      );
    }
    
    // 時間の重複チェック
    const usedSlots = new Set<string>();
    for (const selectedCourse of timetable.courses) {
      // 実際の実装では授業データから schedule を取得
      // ここでは仮実装
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  /**
   * スコア計算
   */
  calculateScore(
    timetable: Timetable,
    mode: GenerationMode
  ): number {
    let score = 0;
    
    // 基本スコア：取得単位数
    score += timetable.totalCredits * 10;
    
    // モードに応じたボーナス
    // 実際の実装では、時間割の配置パターンを分析してスコアを調整
    
    return score;
  }
}