'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTimetableStore } from '@/lib/stores/timetable-store';
import { formatDate } from '@/lib/utils/helpers';
import { Save, Trash2, FileDown } from 'lucide-react';

export function SavedTimetables() {
  const { 
    currentTimetable, 
    savedTimetables, 
    saveTimetable, 
    loadTimetable, 
    deleteTimetable 
  } = useTimetableStore();

  const handleSaveCurrent = () => {
    if (currentTimetable) {
      const name = prompt('時間割の名前を入力してください:', currentTimetable.name);
      if (name) {
        saveTimetable({
          ...currentTimetable,
          name
        });
      }
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>保存済み時間割</CardTitle>
        <Button
          size="sm"
          variant="outline"
          onClick={handleSaveCurrent}
          disabled={!currentTimetable}
        >
          <Save className="h-4 w-4 mr-1" />
          保存
        </Button>
      </CardHeader>
      <CardContent>
        {savedTimetables.length === 0 ? (
          <div className="text-sm text-muted-foreground text-center py-4">
            保存された時間割はありません
          </div>
        ) : (
          <div className="space-y-2">
            {savedTimetables.map(timetable => (
              <div
                key={timetable.id}
                className="border rounded-lg p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{timetable.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {timetable.totalCredits}単位 · {formatDate(timetable.updatedAt)}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => loadTimetable(timetable.id)}
                    >
                      <FileDown className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (confirm('この時間割を削除してもよろしいですか？')) {
                          deleteTimetable(timetable.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}