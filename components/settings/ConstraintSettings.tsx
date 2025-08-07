'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useTimetableStore } from '@/lib/stores/timetable-store';
import { GenerationMode } from '@/types';
import { NGSlotSelector } from './NGSlotSelector';

export function ConstraintSettings() {
  const { settings, updateSettings, generateTimetable } = useTimetableStore();

  const handleRequiredCreditsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    updateSettings({ requiredCredits: value });
  };

  const handleMaxClassesPerDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    updateSettings({ maxClassesPerDay: value });
  };

  const handleModeChange = (value: GenerationMode) => {
    updateSettings({ preferredMode: value });
  };

  const handleGenerate = () => {
    generateTimetable();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>制約条件設定</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="required-credits">必要単位数</Label>
          <Input
            id="required-credits"
            type="number"
            min="1"
            max="30"
            value={settings.requiredCredits}
            onChange={handleRequiredCreditsChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="max-classes">1日の最大コマ数</Label>
          <Input
            id="max-classes"
            type="number"
            min="1"
            max="6"
            value={settings.maxClassesPerDay}
            onChange={handleMaxClassesPerDayChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="generation-mode">生成モード</Label>
          <Select value={settings.preferredMode} onValueChange={handleModeChange}>
            <SelectTrigger id="generation-mode">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="balanced">バランス重視</SelectItem>
              <SelectItem value="minimal">空きコマ最小</SelectItem>
              <SelectItem value="morning">午前集中</SelectItem>
              <SelectItem value="afternoon">午後集中</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>NG時間帯</Label>
          <NGSlotSelector />
        </div>

        <Button 
          onClick={handleGenerate} 
          className="w-full"
          size="lg"
        >
          時間割を生成
        </Button>
      </CardContent>
    </Card>
  );
}