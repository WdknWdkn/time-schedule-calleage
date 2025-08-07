'use client';

import React from 'react';
import { Course } from '@/types';
import { X } from 'lucide-react';
import { getCourseTypeColor, getDifficultyColor } from '@/lib/utils/helpers';

interface TimetableCellProps {
  day: number;
  period: number;
  course?: Course | null;
  onClick?: () => void;
  onDrop?: (courseId: string) => void;
  onRemove?: () => void;
}

export function TimetableCell({
  day,
  period,
  course,
  onClick,
  onDrop,
  onRemove
}: TimetableCellProps) {
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const courseId = e.dataTransfer.getData('courseId');
    if (courseId && onDrop) {
      onDrop(courseId);
    }
  };

  const schedule = course?.schedules.find(s => s.day === day && s.period === period);

  return (
    <div
      className={`
        timetable-cell relative group
        ${course ? 'has-course' : ''}
        ${isDragOver ? 'drag-over' : ''}
        cursor-pointer
      `}
      onClick={onClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {course && schedule && (
        <div className="space-y-1">
          <div className="font-medium text-sm line-clamp-2">
            {course.name}
          </div>
          <div className="text-xs text-muted-foreground">
            {course.instructor}
          </div>
          <div className="text-xs text-muted-foreground">
            {schedule.room}
          </div>
          <div className="flex gap-1 flex-wrap">
            <span className={`inline-block px-1.5 py-0.5 text-xs rounded ${getCourseTypeColor(course.type)}`}>
              {course.type === 'required' ? '必' : '選'}
            </span>
            <span className={`inline-block px-1.5 py-0.5 text-xs rounded ${getDifficultyColor(course.difficulty)}`}>
              {course.credits}単位
            </span>
          </div>
          {onRemove && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4 text-destructive" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}