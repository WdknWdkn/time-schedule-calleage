'use client';

import React from 'react';
import { Course } from '@/types';
import { CourseCard } from './CourseCard';
import { CourseSearch } from './CourseSearch';
import { CourseFilter } from './CourseFilter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CourseListProps {
  courses: Course[];
  selectedCourseIds?: string[];
}

export function CourseList({ courses, selectedCourseIds = [] }: CourseListProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filters, setFilters] = React.useState({
    department: undefined as string | undefined,
    difficulty: undefined as string | undefined,
    type: undefined as string | undefined,
  });

  const filteredCourses = React.useMemo(() => {
    return courses.filter(course => {
      // 既に選択されている授業は除外
      if (selectedCourseIds.includes(course.id)) return false;

      // 検索条件
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesSearch = 
          course.name.toLowerCase().includes(term) ||
          course.code.toLowerCase().includes(term) ||
          course.instructor.toLowerCase().includes(term);
        if (!matchesSearch) return false;
      }

      // フィルター条件
      if (filters.department && course.department !== filters.department) return false;
      if (filters.difficulty && course.difficulty !== filters.difficulty) return false;
      if (filters.type && course.type !== filters.type) return false;

      return true;
    });
  }, [courses, searchTerm, filters, selectedCourseIds]);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>授業一覧</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
        <div className="space-y-2">
          <CourseSearch value={searchTerm} onChange={setSearchTerm} />
          <CourseFilter filters={filters} onFilterChange={setFilters} />
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-2">
          {filteredCourses.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              該当する授業が見つかりません
            </div>
          ) : (
            filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))
          )}
        </div>
        
        <div className="text-sm text-muted-foreground pt-2 border-t">
          {filteredCourses.length}件の授業
        </div>
      </CardContent>
    </Card>
  );
}