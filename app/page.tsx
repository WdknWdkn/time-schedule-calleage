'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { PatternTabs } from '@/components/timetable/PatternTabs';
import { CourseList } from '@/components/course/CourseList';
import { useTimetableStore } from '@/lib/stores/timetable-store';

export default function Home() {
  const { currentTimetable, availableCourses } = useTimetableStore();
  
  const selectedCourseIds = React.useMemo(() => {
    if (!currentTimetable) return [];
    return currentTimetable.courses.map(sc => sc.courseId);
  }, [currentTimetable]);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          <PatternTabs />
        </main>
        <div className="w-96 p-6 overflow-hidden">
          <CourseList 
            courses={availableCourses} 
            selectedCourseIds={selectedCourseIds}
          />
        </div>
      </div>
    </div>
  );
}