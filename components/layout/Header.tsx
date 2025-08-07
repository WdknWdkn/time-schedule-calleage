'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useTimetableStore } from '@/lib/stores/timetable-store';
import { downloadCSV, downloadJSON, generateTimetableFilename } from '@/lib/utils/helpers';

export function Header() {
  const { currentTimetable, exportTimetable } = useTimetableStore();

  const handleExportJSON = () => {
    if (!currentTimetable) return;
    
    const json = exportTimetable('json');
    const filename = generateTimetableFilename(currentTimetable.name, 'json');
    downloadJSON(json, filename);
  };

  const handleExportCSV = () => {
    if (!currentTimetable) return;
    
    const csv = exportTimetable('csv');
    const filename = generateTimetableFilename(currentTimetable.name, 'csv');
    downloadCSV(csv, filename);
  };

  return (
    <header className="border-b bg-background px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">TimeTable AI Lite</h1>
          <p className="text-sm text-muted-foreground">
            大学時間割自動生成システム
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportJSON}
            disabled={!currentTimetable}
          >
            JSON出力
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            disabled={!currentTimetable}
          >
            CSV出力
          </Button>
        </div>
      </div>
    </header>
  );
}