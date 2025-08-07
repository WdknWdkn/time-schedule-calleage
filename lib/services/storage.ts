import { Timetable, UserSettings } from '@/types';

const STORAGE_KEYS = {
  TIMETABLES: 'timetable-lite-timetables',
  SETTINGS: 'timetable-lite-settings',
  CURRENT_TIMETABLE: 'timetable-lite-current'
} as const;

export class StorageService {
  /**
   * 時間割の保存
   */
  static saveTimetable(timetable: Timetable): void {
    try {
      const timetables = this.loadTimetables();
      const existingIndex = timetables.findIndex(t => t.id === timetable.id);
      
      if (existingIndex >= 0) {
        timetables[existingIndex] = timetable;
      } else {
        timetables.push(timetable);
      }
      
      localStorage.setItem(STORAGE_KEYS.TIMETABLES, JSON.stringify(timetables));
    } catch (error) {
      console.error('Failed to save timetable:', error);
    }
  }
  
  /**
   * 時間割一覧の読み込み
   */
  static loadTimetables(): Timetable[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TIMETABLES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load timetables:', error);
      return [];
    }
  }
  
  /**
   * 時間割の削除
   */
  static deleteTimetable(id: string): void {
    try {
      const timetables = this.loadTimetables();
      const filtered = timetables.filter(t => t.id !== id);
      localStorage.setItem(STORAGE_KEYS.TIMETABLES, JSON.stringify(filtered));
    } catch (error) {
      console.error('Failed to delete timetable:', error);
    }
  }
  
  /**
   * 設定の保存
   */
  static saveSettings(settings: UserSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }
  
  /**
   * 設定の読み込み
   */
  static loadSettings(): UserSettings | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load settings:', error);
      return null;
    }
  }
  
  /**
   * 現在の時間割の保存（一時保存用）
   */
  static saveCurrentTimetable(timetable: Timetable): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_TIMETABLE, JSON.stringify(timetable));
    } catch (error) {
      console.error('Failed to save current timetable:', error);
    }
  }
  
  /**
   * 現在の時間割の読み込み
   */
  static loadCurrentTimetable(): Timetable | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_TIMETABLE);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load current timetable:', error);
      return null;
    }
  }
  
  /**
   * JSON形式でエクスポート
   */
  static exportToJSON(timetable: Timetable): string {
    return JSON.stringify(timetable, null, 2);
  }
  
  /**
   * JSONからインポート
   */
  static importFromJSON(json: string): Timetable {
    try {
      const timetable = JSON.parse(json) as Timetable;
      // 基本的なバリデーション
      if (!timetable.id || !timetable.courses || !Array.isArray(timetable.courses)) {
        throw new Error('Invalid timetable format');
      }
      return timetable;
    } catch (error) {
      throw new Error(`Failed to import timetable: ${error}`);
    }
  }
  
  /**
   * CSV形式でエクスポート（時間割グリッド形式）
   */
  static exportToCSV(timetable: Timetable, getCourseById: (id: string) => any): string {
    const days = ['月', '火', '水', '木', '金'];
    const periods = [1, 2, 3, 4, 5, 6];
    const rows: string[][] = [];
    
    // ヘッダー行
    rows.push(['時限', ...days]);
    
    // 各時限の行
    for (const period of periods) {
      const row = [period.toString()];
      
      for (let day = 1; day <= 5; day++) {
        // この時間帯の授業を探す
        const courseData = timetable.courses.find(sc => {
          const course = getCourseById(sc.courseId);
          if (!course) return false;
          const schedule = course.schedules[sc.scheduleIndex];
          return schedule.day === day && schedule.period === period;
        });
        
        if (courseData) {
          const course = getCourseById(courseData.courseId);
          row.push(course ? `${course.name} (${course.room || ''})` : '');
        } else {
          row.push('');
        }
      }
      
      rows.push(row);
    }
    
    // CSV文字列に変換
    return rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  }
  
  /**
   * ローカルストレージの使用量を取得（KB単位）
   */
  static getStorageUsage(): number {
    let totalSize = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        totalSize += localStorage[key].length + key.length;
      }
    }
    return Math.round(totalSize / 1024);
  }
  
  /**
   * アプリケーションデータのクリア
   */
  static clearAllData(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
  
  /**
   * データのバックアップ（全データをJSON形式で）
   */
  static createBackup(): string {
    const backup = {
      timetables: this.loadTimetables(),
      settings: this.loadSettings(),
      currentTimetable: this.loadCurrentTimetable(),
      exportDate: new Date().toISOString()
    };
    return JSON.stringify(backup, null, 2);
  }
  
  /**
   * バックアップからの復元
   */
  static restoreFromBackup(backupJson: string): void {
    try {
      const backup = JSON.parse(backupJson);
      
      if (backup.timetables) {
        localStorage.setItem(STORAGE_KEYS.TIMETABLES, JSON.stringify(backup.timetables));
      }
      
      if (backup.settings) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(backup.settings));
      }
      
      if (backup.currentTimetable) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_TIMETABLE, JSON.stringify(backup.currentTimetable));
      }
    } catch (error) {
      throw new Error(`Failed to restore from backup: ${error}`);
    }
  }
}