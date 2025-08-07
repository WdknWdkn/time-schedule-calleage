'use client';

import React from 'react';
import { Course, SelectedCourse } from '@/types';
import { TimetableCell } from './TimetableCell';
import { getDayName } from '@/lib/utils/helpers';

interface TimetableGridProps {
  courses: SelectedCourse[];
  availableCourses: Course[];
  onCellClick?: (day: number, period: number) => void;
  onCourseDrop?: (courseId: string, day: number, period: number) => void;
  onCourseRemove?: (courseId: string) => void;
}

export function TimetableGrid({ 
  courses, 
  availableCourses,
  onCellClick, 
  onCourseDrop,
  onCourseRemove
}: TimetableGridProps) {
  const days = [1, 2, 3, 4, 5];
  const periods = [1, 2, 3, 4, 5, 6];
  
  const findCourseInSlot = (day: number, period: number) => {
    return courses.find(sc => {
      const course = availableCourses.find(c => c.id === sc.courseId);
      if (!course) return false;
      const schedule = course.schedules[sc.scheduleIndex];
      return schedule.day === day && schedule.period === period;
    });
  };
  
  const getCourseData = (selectedCourse: SelectedCourse | undefined) => {
    if (!selectedCourse) return null;
    return availableCourses.find(c => c.id === selectedCourse.courseId);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="timetable-grid">
        {/* ヘッダー行 */}
        <div className="font-bold text-center p-2 bg-gray-100 text-sm">時限</div>
        {days.map(day => (
          <div key={day} className="font-bold text-center p-2 bg-gray-100 text-sm">
            {getDayName(day)}
          </div>
        ))}
        
        {/* 時間割セル */}
        {periods.map(period => (
          <React.Fragment key={period}>
            <div className="font-bold text-center p-2 bg-gray-100 text-sm">
              {period}限
            </div>
            {days.map(day => {
              const selectedCourse = findCourseInSlot(day, period);
              const course = getCourseData(selectedCourse);
              
              return (
                <TimetableCell
                  key={`${day}-${period}`}
                  day={day}
                  period={period}
                  course={course}
                  onClick={() => onCellClick?.(day, period)}
                  onDrop={(courseId) => onCourseDrop?.(courseId, day, period)}
                  onRemove={() => course && onCourseRemove?.(course.id)}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}