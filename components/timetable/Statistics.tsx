'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timetable, Course } from '@/types';

interface StatisticsProps {
  timetable: Timetable;
  availableCourses: Course[];
}

export function Statistics({ timetable, availableCourses }: StatisticsProps) {
  const stats = React.useMemo(() => {
    const courseData = timetable.courses.map(sc => 
      availableCourses.find(c => c.id === sc.courseId)
    ).filter(Boolean) as Course[];
    
    const requiredCourses = courseData.filter(c => c.type === 'required');
    const electiveCourses = courseData.filter(c => c.type === 'elective');
    
    // 空きコマ数を計算
    const usedSlots = new Set<string>();
    courseData.forEach(course => {
      const selectedCourse = timetable.courses.find(sc => sc.courseId === course.id);
      if (selectedCourse) {
        const schedule = course.schedules[selectedCourse.scheduleIndex];
        usedSlots.add(`${schedule.day}-${schedule.period}`);
      }
    });
    
    const emptySlots = 30 - usedSlots.size; // 5日 × 6コマ = 30
    
    // 曜日ごとのコマ数
    const classesByDay: number[] = [0, 0, 0, 0, 0];
    courseData.forEach(course => {
      const selectedCourse = timetable.courses.find(sc => sc.courseId === course.id);
      if (selectedCourse) {
        const schedule = course.schedules[selectedCourse.scheduleIndex];
        classesByDay[schedule.day - 1]++;
      }
    });
    
    return {
      totalCredits: timetable.totalCredits,
      totalCourses: courseData.length,
      requiredCourses: requiredCourses.length,
      electiveCourses: electiveCourses.length,
      emptySlots,
      classesByDay
    };
  }, [timetable, availableCourses]);

  const days = ['月', '火', '水', '木', '金'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>統計情報</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <div className="text-2xl font-bold">{stats.totalCredits}</div>
            <div className="text-sm text-muted-foreground">合計単位数</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.totalCourses}</div>
            <div className="text-sm text-muted-foreground">登録科目数</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.emptySlots}</div>
            <div className="text-sm text-muted-foreground">空きコマ数</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.requiredCourses}</div>
            <div className="text-sm text-muted-foreground">必修科目</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.electiveCourses}</div>
            <div className="text-sm text-muted-foreground">選択科目</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="text-sm font-medium mb-2">曜日別コマ数</div>
          <div className="flex gap-2">
            {days.map((day, index) => (
              <div key={day} className="flex-1 text-center">
                <div className="text-sm text-muted-foreground">{day}</div>
                <div className="text-lg font-medium">{stats.classesByDay[index]}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}