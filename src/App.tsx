import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { 
  LayoutDashboard, 
  Bot, 
  BarChart2, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { DraggableSection } from './components/DraggableSection';
import { PersonalInfoSection } from './components/PersonalInfoSection';
import { CareerSection } from './components/CareerSection';
import { ProjectSection } from './components/ProjectSection';
import { EducationSection } from './components/EducationSection';
import { CoursesSection } from './components/CoursesSection';
import { CertificatesSection } from './components/CertificatesSection';
import { Sidebar } from './components/Sidebar';
import { AICoach } from './components/AICoach';
import { Analytics } from './components/Analytics';
import { SettingsPanel } from './components/SettingsPanel';
import { PrintCV } from './components/PrintCV';
import { useCVStore } from './store/cvStore';
import type { CVSection } from './types/cv';

type View = 'editor' | 'ai-coach' | 'analytics' | 'settings';

function App() {
  const { data, reorderSections, toggleSectionVisibility } = useCVStore();
  const [currentView, setCurrentView] = useState<View>('editor');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = data.sections.findIndex((section) => section.id === active.id);
      const newIndex = data.sections.findIndex((section) => section.id === over.id);
      
      const newSections = arrayMove(data.sections, oldIndex, newIndex).map(
        (section, index) => ({ ...section, order: index })
      );
      
      reorderSections(newSections);
    }
  };

  const navigationItems = [
    { id: 'editor', label: 'CV Editor', icon: LayoutDashboard },
    { id: 'ai-coach', label: 'AI Coach', icon: Bot },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'settings', label: 'Indstillinger', icon: Settings },
  ];

  const renderSectionContent = (section: CVSection) => {
    switch (section.type) {
      case 'personal':
        return <PersonalInfoSection info={data.personalInfo} />;
      case 'career':
        return <CareerSection entries={data.career} />;
      case 'projects':
        return <ProjectSection projects={data.projects} />;
      case 'education':
        return <EducationSection education={data.education} />;
      case 'courses':
        return <CoursesSection courses={data.courses} />;
      case 'certificates':
        return <CertificatesSection certificates={data.certificates} />;
      default:
        return null;
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'editor':
        return (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={data.sections.map(section => section.id)}
              strategy={verticalListSortingStrategy}
            >
              {data.sections
                .sort((a, b) => a.order - b.order)
                .map((section) => (
                  <DraggableSection
                    key={section.id}
                    section={section}
                    onToggleVisibility={toggleSectionVisibility}
                  >
                    {renderSectionContent(section)}
                  </DraggableSection>
                ))}
            </SortableContext>
          </DndContext>
        );
      case 'ai-coach':
        return <AICoach />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return null;
    }
  };

  if (!data || !data.personalInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <Sidebar
        items={navigationItems}
        currentView={currentView}
        onViewChange={setCurrentView}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
          <div className="max-w-5xl mx-auto px-6">
            <h1 className="text-5xl font-bold mb-4">{data.personalInfo.title}</h1>
            <p className="text-xl text-gray-300">{data.personalInfo.currentRole}</p>
          </div>
        </header>

        <main className="max-w-5xl mx-auto py-12 px-6">
          {renderView()}
        </main>

        <footer className="bg-gray-900 text-gray-400 py-8 mt-16">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p>© 2024 - Alle rettigheder forbeholdes</p>
          </div>
        </footer>
      </div>
      <PrintCV />
    </div>
  );
}

export default App;