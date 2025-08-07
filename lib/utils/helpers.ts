import { Course, CourseSchedule } from '@/types';

/**
 * 曜日の数値を日本語に変換
 */
export function getDayName(day: number): string {
  const days = ['', '月', '火', '水', '木', '金'];
  return days[day] || '';
}

/**
 * 時限の表示形式を取得
 */
export function getPeriodDisplay(period: number): string {
  return `${period}限`;
}

/**
 * 授業の時間帯を文字列で表現
 */
export function getScheduleDisplay(schedule: CourseSchedule): string {
  return `${getDayName(schedule.day)}${getPeriodDisplay(schedule.period)}`;
}

/**
 * 複数のスケジュールを文字列で表現
 */
export function getSchedulesDisplay(schedules: CourseSchedule[]): string {
  return schedules.map(s => getScheduleDisplay(s)).join(', ');
}

/**
 * 難易度の表示ラベルを取得
 */
export function getDifficultyLabel(difficulty: Course['difficulty']): string {
  const labels = {
    easy: '易しい',
    normal: '普通',
    hard: '難しい'
  };
  return labels[difficulty] || difficulty;
}

/**
 * 難易度に応じた色クラスを取得
 */
export function getDifficultyColor(difficulty: Course['difficulty']): string {
  const colors = {
    easy: 'text-green-600 bg-green-50',
    normal: 'text-blue-600 bg-blue-50',
    hard: 'text-red-600 bg-red-50'
  };
  return colors[difficulty] || '';
}

/**
 * 授業タイプのラベルを取得
 */
export function getCourseTypeLabel(type: Course['type']): string {
  const labels = {
    required: '必修',
    elective: '選択'
  };
  return labels[type] || type;
}

/**
 * 授業タイプに応じた色クラスを取得
 */
export function getCourseTypeColor(type: Course['type']): string {
  const colors = {
    required: 'text-purple-600 bg-purple-50',
    elective: 'text-gray-600 bg-gray-50'
  };
  return colors[type] || '';
}

/**
 * ファイルダウンロード用のヘルパー
 */
export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * CSVファイルのダウンロード
 */
export function downloadCSV(content: string, filename: string): void {
  // BOMを付けて文字化けを防ぐ
  const bom = '\uFEFF';
  downloadFile(bom + content, filename, 'text/csv;charset=utf-8');
}

/**
 * JSONファイルのダウンロード
 */
export function downloadJSON(content: string, filename: string): void {
  downloadFile(content, filename, 'application/json;charset=utf-8');
}

/**
 * 日付のフォーマット
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * 時間割のファイル名を生成
 */
export function generateTimetableFilename(name: string, extension: string): string {
  const date = new Date().toISOString().split('T')[0];
  const safeName = name.replace(/[^a-zA-Z0-9ぁ-んァ-ヶー一-龠]/g, '_');
  return `${safeName}_${date}.${extension}`;
}

/**
 * スロットキーの生成（day-period形式）
 */
export function getSlotKey(day: number, period: number): string {
  return `${day}-${period}`;
}

/**
 * スロットキーからday, periodを取得
 */
export function parseSlotKey(slotKey: string): { day: number; period: number } | null {
  const [dayStr, periodStr] = slotKey.split('-');
  const day = parseInt(dayStr, 10);
  const period = parseInt(periodStr, 10);
  
  if (isNaN(day) || isNaN(period)) {
    return null;
  }
  
  return { day, period };
}

/**
 * 配列をシャッフル（Fisher-Yates）
 */
export function shuffleArray<T>(array: T[], seed?: number): T[] {
  const shuffled = [...array];
  let currentIndex = shuffled.length;
  
  // シード値を使った疑似乱数生成
  let seedValue = seed ?? 0;
  const random = seed !== undefined
    ? () => {
        const x = Math.sin(seedValue++) * 10000;
        return x - Math.floor(x);
      }
    : Math.random;
  
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(random() * currentIndex);
    currentIndex--;
    [shuffled[currentIndex], shuffled[randomIndex]] = 
    [shuffled[randomIndex], shuffled[currentIndex]];
  }
  
  return shuffled;
}

/**
 * デバウンス関数
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}