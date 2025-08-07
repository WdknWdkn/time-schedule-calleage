import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Timetable, UserSettings, Course } from '@/types';
import { SimpleTimetableGenerator } from '@/lib/services/generator';
import { DEMO_COURSES } from '@/lib/data/demo-courses';

interface TimetableStore {
  // 状態
  currentTimetable: Timetable | null;
  savedTimetables: Timetable[];
  settings: UserSettings;
  generatedPatterns: Timetable[];
  availableCourses: Course[];
  selectedPattern: number;
  
  // アクション
  generateTimetable: () => void;
  saveTimetable: (timetable: Timetable) => void;
  loadTimetable: (id: string) => void;
  deleteTimetable: (id: string) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  selectPattern: (index: number) => void;
  addCourseToTimetable: (courseId: string, day: number, period: number) => void;
  removeCourseFromTimetable: (courseId: string) => void;
  exportTimetable: (format: 'json' | 'csv') => string;
  importTimetable: (data: string) => void;
  resetStore: () => void;
}

const initialSettings: UserSettings = {
  requiredCredits: 20,
  maxClassesPerDay: 4,
  ngSlots: [],
  preferredMode: 'balanced'
};

export const useTimetableStore = create<TimetableStore>()(
  persist(
    (set, get) => ({
      currentTimetable: null,
      savedTimetables: [],
      settings: initialSettings,
      generatedPatterns: [],
      availableCourses: DEMO_COURSES,
      selectedPattern: 0,
      
      generateTimetable: () => {
        const { settings, availableCourses } = get();
        const generator = new SimpleTimetableGenerator();
        const result = generator.generate(settings, availableCourses);
        
        set({
          generatedPatterns: result.patterns,
          currentTimetable: result.patterns[0],
          selectedPattern: 0
        });
      },
      
      saveTimetable: (timetable) => {
        set(state => ({
          savedTimetables: [...state.savedTimetables, {
            ...timetable,
            updatedAt: new Date().toISOString()
          }]
        }));
      },
      
      loadTimetable: (id) => {
        const { savedTimetables } = get();
        const timetable = savedTimetables.find(t => t.id === id);
        if (timetable) {
          set({ currentTimetable: timetable });
        }
      },
      
      deleteTimetable: (id) => {
        set(state => ({
          savedTimetables: state.savedTimetables.filter(t => t.id !== id)
        }));
      },
      
      updateSettings: (newSettings) => {
        set(state => ({
          settings: { ...state.settings, ...newSettings }
        }));
      },
      
      selectPattern: (index) => {
        const { generatedPatterns } = get();
        if (index >= 0 && index < generatedPatterns.length) {
          set({
            selectedPattern: index,
            currentTimetable: generatedPatterns[index]
          });
        }
      },
      
      addCourseToTimetable: (courseId, day, period) => {
        const { currentTimetable, availableCourses } = get();
        if (!currentTimetable) return;
        
        const course = availableCourses.find(c => c.id === courseId);
        if (!course) return;
        
        // 指定された曜日・時限に合うスケジュールを探す
        const scheduleIndex = course.schedules.findIndex(
          s => s.day === day && s.period === period
        );
        
        if (scheduleIndex === -1) return;
        
        // 既に同じ授業が登録されていないかチェック
        const existingCourse = currentTimetable.courses.find(
          c => c.courseId === courseId
        );
        
        if (existingCourse) return;
        
        const updatedCourses = [
          ...currentTimetable.courses,
          { courseId, scheduleIndex }
        ];
        
        const totalCredits = updatedCourses.reduce((sum, sc) => {
          const course = availableCourses.find(c => c.id === sc.courseId);
          return sum + (course?.credits || 0);
        }, 0);
        
        set({
          currentTimetable: {
            ...currentTimetable,
            courses: updatedCourses,
            totalCredits,
            updatedAt: new Date().toISOString()
          }
        });
      },
      
      removeCourseFromTimetable: (courseId) => {
        const { currentTimetable, availableCourses } = get();
        if (!currentTimetable) return;
        
        const updatedCourses = currentTimetable.courses.filter(
          c => c.courseId !== courseId
        );
        
        const totalCredits = updatedCourses.reduce((sum, sc) => {
          const course = availableCourses.find(c => c.id === sc.courseId);
          return sum + (course?.credits || 0);
        }, 0);
        
        set({
          currentTimetable: {
            ...currentTimetable,
            courses: updatedCourses,
            totalCredits,
            updatedAt: new Date().toISOString()
          }
        });
      },
      
      exportTimetable: (format) => {
        const { currentTimetable, availableCourses } = get();
        if (!currentTimetable) return '';
        
        if (format === 'json') {
          return JSON.stringify(currentTimetable, null, 2);
        } else if (format === 'csv') {
          // CSV形式でエクスポート
          const days = ['月', '火', '水', '木', '金'];
          const periods = [1, 2, 3, 4, 5, 6];
          let csv = '時限,' + days.join(',') + '\n';
          
          for (const period of periods) {
            const row = [period.toString()];
            for (let day = 1; day <= 5; day++) {
              const course = currentTimetable.courses.find(sc => {
                const c = availableCourses.find(course => course.id === sc.courseId);
                if (!c) return false;
                const schedule = c.schedules[sc.scheduleIndex];
                return schedule.day === day && schedule.period === period;
              });
              
              if (course) {
                const c = availableCourses.find(ac => ac.id === course.courseId);
                row.push(c?.name || '');
              } else {
                row.push('');
              }
            }
            csv += row.join(',') + '\n';
          }
          
          return csv;
        }
        
        return '';
      },
      
      importTimetable: (data) => {
        try {
          const timetable = JSON.parse(data) as Timetable;
          set({ currentTimetable: timetable });
        } catch (error) {
          console.error('Failed to import timetable:', error);
        }
      },
      
      resetStore: () => {
        set({
          currentTimetable: null,
          savedTimetables: [],
          settings: initialSettings,
          generatedPatterns: [],
          selectedPattern: 0
        });
      }
    }),
    {
      name: 'timetable-storage',
      partialize: (state) => ({
        savedTimetables: state.savedTimetables,
        settings: state.settings
      })
    }
  )
);