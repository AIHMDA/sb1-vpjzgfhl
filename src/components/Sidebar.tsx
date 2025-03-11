import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarProps {
  items: SidebarItem[];
  currentView: string;
  onViewChange: (view: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ items, currentView, onViewChange, isOpen }: SidebarProps) {
  return (
    <aside
      className={`
        fixed top-0 left-0 h-full bg-white shadow-xl z-40 transition-all duration-300
        ${isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:translate-x-0 lg:w-20'}
      `}
    >
      <div className="h-full flex flex-col">
        <div className="p-6">
          <h2 className={`font-bold text-gray-800 transition-all duration-300 ${isOpen ? 'text-xl' : 'text-center text-sm'}`}>
            {isOpen ? 'CV Platform' : 'CV'}
          </h2>
        </div>

        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onViewChange(item.id)}
                    className={`
                      w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-all
                      ${currentView === item.id
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className={`transition-all ${isOpen ? 'opacity-100' : 'opacity-0 lg:hidden'}`}>
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-6">
          <div className={`text-sm text-gray-500 ${isOpen ? 'block' : 'hidden'}`}>
            Version 1.0.0
          </div>
        </div>
      </div>
    </aside>
  );
}