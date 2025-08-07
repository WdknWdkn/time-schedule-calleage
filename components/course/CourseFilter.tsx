'use client';

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DEPARTMENTS } from '@/lib/data/demo-courses';

interface CourseFilterProps {
  filters: {
    department?: string;
    difficulty?: string;
    type?: string;
  };
  onFilterChange: (filters: any) => void;
}

export function CourseFilter({ filters, onFilterChange }: CourseFilterProps) {
  const handleDepartmentChange = (value: string) => {
    onFilterChange({
      ...filters,
      department: value === 'all' ? undefined : value
    });
  };

  const handleDifficultyChange = (value: string) => {
    onFilterChange({
      ...filters,
      difficulty: value === 'all' ? undefined : value
    });
  };

  const handleTypeChange = (value: string) => {
    onFilterChange({
      ...filters,
      type: value === 'all' ? undefined : value
    });
  };

  return (
    <div className="space-y-2">
      <Select value={filters.department || 'all'} onValueChange={handleDepartmentChange}>
        <SelectTrigger>
          <SelectValue placeholder="学科を選択" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">すべての学科</SelectItem>
          {DEPARTMENTS.map(dept => (
            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
          ))}
          <SelectItem value="一般教養">一般教養</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.difficulty || 'all'} onValueChange={handleDifficultyChange}>
        <SelectTrigger>
          <SelectValue placeholder="難易度を選択" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">すべての難易度</SelectItem>
          <SelectItem value="easy">易しい</SelectItem>
          <SelectItem value="normal">普通</SelectItem>
          <SelectItem value="hard">難しい</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.type || 'all'} onValueChange={handleTypeChange}>
        <SelectTrigger>
          <SelectValue placeholder="種別を選択" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">すべての種別</SelectItem>
          <SelectItem value="required">必修</SelectItem>
          <SelectItem value="elective">選択</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}