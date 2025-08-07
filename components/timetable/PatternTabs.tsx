'use client';

import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { TimetableGrid } from './TimetableGrid';
import { Statistics } from './Statistics';
import { useTimetableStore } from '@/lib/stores/timetable-store';

export function PatternTabs() {
  const { 
    generatedPatterns, 
    selectedPattern, 
    selectPattern,
    availableCourses,
    addCourseToTimetable,
    removeCourseFromTimetable
  } = useTimetableStore();

  if (generatedPatterns.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 text-muted-foreground">
        左の設定から時間割を生成してください
      </div>
    );
  }

  return (
    <Tabs value={selectedPattern.toString()} onValueChange={(v) => selectPattern(parseInt(v))}>
      <TabsList className="grid w-full grid-cols-3">
        {generatedPatterns.map((_, index) => (
          <TabsTrigger key={index} value={index.toString()}>
            パターン {index + 1}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {generatedPatterns.map((pattern, index) => (
        <TabsContent key={index} value={index.toString()} className="space-y-4">
          <TimetableGrid 
            courses={pattern.courses}
            availableCourses={availableCourses}
            onCourseDrop={addCourseToTimetable}
            onCourseRemove={removeCourseFromTimetable}
          />
          <Statistics timetable={pattern} availableCourses={availableCourses} />
        </TabsContent>
      ))}
    </Tabs>
  );
}