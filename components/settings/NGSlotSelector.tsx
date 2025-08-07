'use client';

import React from 'react';
import { useTimetableStore } from '@/lib/stores/timetable-store';
import { getDayName, getPeriodDisplay } from '@/lib/utils/helpers';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NGSlotSelector() {
  const { settings, updateSettings } = useTimetableStore();
  const [selectedSlots, setSelectedSlots] = React.useState<Set<string>>(
    new Set(settings.ngSlots.map(slot => `${slot.day}-${slot.period}`))
  );

  const days = [1, 2, 3, 4, 5];
  const periods = [1, 2, 3, 4, 5, 6];

  const toggleSlot = (day: number, period: number) => {
    const key = `${day}-${period}`;
    const newSelectedSlots = new Set(selectedSlots);
    
    if (newSelectedSlots.has(key)) {
      newSelectedSlots.delete(key);
    } else {
      newSelectedSlots.add(key);
    }
    
    setSelectedSlots(newSelectedSlots);
    
    // NGスロットの配列を更新
    const ngSlots = Array.from(newSelectedSlots).map(slotKey => {
      const [day, period] = slotKey.split('-').map(Number);
      return { day, period };
    });
    
    updateSettings({ ngSlots });
  };

  const clearAll = () => {
    setSelectedSlots(new Set());
    updateSettings({ ngSlots: [] });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">
          授業を入れたくない時間帯を選択
        </span>
        {selectedSlots.size > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="h-auto p-1 text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            クリア
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-6 gap-1 text-xs">
        <div></div>
        {days.map(day => (
          <div key={day} className="text-center font-medium p-1">
            {getDayName(day)}
          </div>
        ))}
        
        {periods.map(period => (
          <React.Fragment key={period}>
            <div className="text-center font-medium p-1">
              {period}限
            </div>
            {days.map(day => {
              const isSelected = selectedSlots.has(`${day}-${period}`);
              return (
                <button
                  key={`${day}-${period}`}
                  onClick={() => toggleSlot(day, period)}
                  className={`
                    p-2 border rounded transition-colors
                    ${isSelected 
                      ? 'bg-destructive text-destructive-foreground' 
                      : 'bg-background hover:bg-muted'
                    }
                  `}
                  aria-label={`${getDayName(day)}${getPeriodDisplay(period)}`}
                >
                  {isSelected && <X className="h-3 w-3 mx-auto" />}
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      
      {selectedSlots.size > 0 && (
        <div className="mt-2 text-xs text-muted-foreground">
          {selectedSlots.size}個の時間帯を除外中
        </div>
      )}
    </div>
  );
}