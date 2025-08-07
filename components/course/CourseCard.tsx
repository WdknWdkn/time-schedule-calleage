'use client';

import React from 'react';
import { Course } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { 
  getCourseTypeLabel, 
  getCourseTypeColor, 
  getDifficultyLabel,
  getDifficultyColor,
  getSchedulesDisplay 
} from '@/lib/utils/helpers';

interface CourseCardProps {
  course: Course;
  isDraggable?: boolean;
}

export function CourseCard({ course, isDraggable = true }: CourseCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    if (!isDraggable) return;
    e.dataTransfer.setData('courseId', course.id);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <Card 
      className={`${isDraggable ? 'cursor-move hover:shadow-md' : ''} transition-shadow`}
      draggable={isDraggable}
      onDragStart={handleDragStart}
    >
      <CardContent className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-sm line-clamp-2 flex-1">
            {course.name}
          </h3>
          <span className="text-xs font-medium ml-2 shrink-0">
            {course.code}
          </span>
        </div>
        
        <div className="text-xs text-muted-foreground space-y-1">
          <div>{course.instructor}</div>
          <div>{course.department}</div>
          <div>{getSchedulesDisplay(course.schedules)}</div>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <span className={`inline-block px-2 py-1 text-xs rounded ${getCourseTypeColor(course.type)}`}>
            {getCourseTypeLabel(course.type)}
          </span>
          <span className={`inline-block px-2 py-1 text-xs rounded ${getDifficultyColor(course.difficulty)}`}>
            {getDifficultyLabel(course.difficulty)}
          </span>
          <span className="inline-block px-2 py-1 text-xs rounded bg-gray-100 text-gray-700">
            {course.credits}単位
          </span>
        </div>
      </CardContent>
    </Card>
  );
}