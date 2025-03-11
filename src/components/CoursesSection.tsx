import React, { useState } from 'react';
import { Book, Building2, Calendar, Edit2, Check, Plus, X, Search } from 'lucide-react';
import type { Course } from '../types/cv';
import { useCVStore } from '../store/cvStore';

interface CoursesSectionProps {
  courses: Course[];
}

export function CoursesSection({ courses }: CoursesSectionProps) {
  const { updateCourse, addCourse } = useCVStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedCourse, setEditedCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'year' | 'title'>('year');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleEdit = (course: Course) => {
    setEditingId(course.id);
    setEditedCourse({ ...course });
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditedCourse({
      id: '',
      title: '',
      provider: '',
      year: new Date().getFullYear().toString()
    });
  };

  const handleSave = () => {
    if (editedCourse) {
      if (isAddingNew) {
        addCourse(editedCourse);
        setIsAddingNew(false);
      } else {
        updateCourse(editedCourse.id, editedCourse);
      }
      setEditingId(null);
      setEditedCourse(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedCourse(null);
    setIsAddingNew(false);
  };

  const filteredAndSortedCourses = courses
    .filter(course => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.provider.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'year') {
        return sortOrder === 'desc' 
          ? b.year.localeCompare(a.year)
          : a.year.localeCompare(b.year);
      } else {
        return sortOrder === 'desc'
          ? b.title.localeCompare(a.title)
          : a.title.localeCompare(b.title);
      }
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Søg efter kurser..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00A3E0] focus:border-transparent"
          />
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-[#00A3E0] text-white rounded-lg hover:bg-[#0082B3] flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Tilføj kursus
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'year' | 'title')}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00A3E0] focus:border-transparent"
          >
            <option value="year">Sortér efter år</option>
            <option value="title">Sortér efter titel</option>
          </select>
          <button
            onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {(isAddingNew || editingId) && editedCourse && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Titel</label>
              <input
                type="text"
                value={editedCourse?.title || ''}
                onChange={(e) => setEditedCourse(prev => prev ? { ...prev, title: e.target.value } : null)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Udbyder</label>
              <input
                type="text"
                value={editedCourse?.provider || ''}
                onChange={(e) => setEditedCourse(prev => prev ? { ...prev, provider: e.target.value } : null)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Lokation</label>
              <input
                type="text"
                value={editedCourse?.location || ''}
                onChange={(e) => setEditedCourse(prev => prev ? { ...prev, location: e.target.value } : null)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">År</label>
              <input
                type="text"
                value={editedCourse?.year || ''}
                onChange={(e) => setEditedCourse(prev => prev ? { ...prev, year: e.target.value } : null)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Beskrivelse</label>
              <textarea
                value={editedCourse?.description || ''}
                onChange={(e) => setEditedCourse(prev => prev ? { ...prev, description: e.target.value } : null)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg h-32"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Annuller
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#00A3E0] text-white rounded-lg hover:bg-[#0082B3] flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Gem
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAndSortedCourses.map((course) => (
          <div key={course.id} className="group bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Book className="w-4 h-4 text-[#00A3E0]" />
                  {course.title}
                </h3>
                <button
                  onClick={() => handleEdit(course)}
                  className="text-gray-400 hover:text-[#00A3E0] opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-gray-600 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  {course.provider}
                  {course.location && ` - ${course.location}`}
                </p>
                <p className="text-gray-500 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {course.year}
                </p>
                {course.description && (
                  <p className="text-gray-600 mt-2">{course.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}