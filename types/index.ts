// 授業データ
export interface Course {
  id: string;
  code: string;           // 授業コード（例: "CS101"）
  name: string;           // 授業名
  credits: number;        // 単位数
  type: 'required' | 'elective';  // 必修/選択
  instructor: string;     // 担当教員
  department: string;     // 学科
  difficulty: 'easy' | 'normal' | 'hard';  // 難易度
  schedules: CourseSchedule[];  // 開講時間
}

// 授業スケジュール
export interface CourseSchedule {
  day: 1 | 2 | 3 | 4 | 5;  // 月〜金
  period: 1 | 2 | 3 | 4 | 5 | 6;  // 1〜6限
  room: string;  // 教室
}

// 時間割
export interface Timetable {
  id: string;
  name: string;
  semester: string;  // "2024年前期" など
  courses: SelectedCourse[];
  totalCredits: number;
  createdAt: string;
  updatedAt: string;
}

// 選択された授業
export interface SelectedCourse {
  courseId: string;
  scheduleIndex: number;  // どのスケジュールを選択したか
}

// ユーザー設定（LocalStorageに保存）
export interface UserSettings {
  requiredCredits: number;  // 必要単位数
  maxClassesPerDay: number;  // 1日の最大コマ数
  ngSlots: NGSlot[];  // NG時間帯
  preferredMode: GenerationMode;  // 優先モード
}

// NG時間帯
export interface NGSlot {
  day: number;
  period: number;
  reason?: string;  // バイト、サークル等
}

// 生成モード
export type GenerationMode = 'balanced' | 'minimal' | 'morning' | 'afternoon';

// 生成結果
export interface GenerationResult {
  patterns: Timetable[];  // 複数パターン（最大3つ）
  metadata: {
    totalCredits: number;
    requiredCourses: number;
    electiveCourses: number;
    emptySlots: number;
    score: number;
  };
}

// バリデーション結果
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// UI機能
export interface UIFeatures {
  // 時間割表示
  displayMode: 'grid' | 'list';  // グリッド表示/リスト表示
  
  // フィルター機能
  filters: {
    department?: string;
    difficulty?: string;
    instructor?: string;
    day?: number;
    period?: number;
  };
  
  // ドラッグ&ドロップ
  enableDragDrop: boolean;
  
  // ダークモード
  darkMode: boolean;
}