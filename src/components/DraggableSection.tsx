import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Eye, EyeOff } from 'lucide-react';
import type { CVSection } from '../types/cv';

interface DraggableSectionProps {
  section: CVSection;
  children: React.ReactNode;
  onToggleVisibility: (id: string) => void;
}

export function DraggableSection({ section, children, onToggleVisibility }: DraggableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <section
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-lg shadow-md mb-8 ${isDragging ? 'cursor-grabbing' : ''}`}
    >
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            {...attributes}
            {...listeners}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <GripVertical className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold text-[#FF6B00]">{section.title}</h2>
        </div>
        <button
          onClick={() => onToggleVisibility(section.id)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          {section.visible ? (
            <Eye className="w-5 h-5" />
          ) : (
            <EyeOff className="w-5 h-5" />
          )}
        </button>
      </div>
      {section.visible && (
        <div className="p-6">
          {children}
        </div>
      )}
    </section>
  );
}