'use client';

import React from 'react';
import { ConstraintSettings } from '@/components/settings/ConstraintSettings';
import { SavedTimetables } from './SavedTimetables';

export function Sidebar() {
  return (
    <aside className="w-80 bg-background border-r h-full overflow-y-auto custom-scrollbar">
      <div className="p-4 space-y-4">
        <ConstraintSettings />
        <SavedTimetables />
      </div>
    </aside>
  );
}