import React, { useState } from 'react';
import { Calendar, Building2, GraduationCap, Edit2, Check, Plus, X } from 'lucide-react';
import type { Education } from '../types/cv';
import { useCVStore } from '../store/cvStore';

interface EducationSectionProps {
  education: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
  const { updateEducation, addEducation } = useCVStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedEducation, setEditedEducation] = useState<Education | null>(null);
  const [newSpecialization, setNewSpecialization] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleEdit = (edu: Education) => {
    setEditingId(edu.id);
    setEditedEducation({ ...edu });
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditedEducation({
      id: '',
      degree: '',
      institution: '',
      startDate: '',
      endDate: null,
      specialization: []
    });
  };

  const handleSave = () => {
    if (editedEducation) {
      if (isAddingNew) {
        addEducation(editedEducation);
        setIsAddingNew(false);
      } else {
        updateEducation(editedEducation.id, editedEducation);
      }
      setEditingId(null);
      setEditedEducation(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedEducation(null);
    setIsAddingNew(false);
  };

  const handleAddSpecialization = () => {
    if (editedEducation && newSpecialization.trim()) {
      const updatedSpecializations = [...(editedEducation.specialization || []), newSpecialization.trim()];
      setEditedEducation({ ...editedEducation, specialization: updatedSpecializations });
      setNewSpecialization("");
    }
  };

  const handleRemoveSpecialization = (index: number) => {
    if (editedEducation) {
      const updatedSpecializations = editedEducation.specialization?.filter((_, i) => i !== index);
      setEditedEducation({ ...editedEducation, specialization: updatedSpecializations });
    }
  };

  const groupBySemester = (specializations: string[] = []) => {
    const semesterGroups = {
      'Semester 7 - Afgangssemester': specializations.filter(s => 
        s.includes('Afgangsprojekt')),
      'Semester 6 - Praktik': specializations.filter(s => 
        s.includes('Ingeniørpraktik')),
      'Semester 5 - Anlægskonstruktioner': specializations.filter(s => 
        ['Afløbsteknik', 'Vejbygning', 'Planlægning', 'Entrepriseret', 'Vidensteori', 'Statistik'].some(keyword => 
          s.toLowerCase().includes(keyword.toLowerCase()))),
      'Semester 4 - Etagebyggeri': specializations.filter(s => 
        ['Plasticitet', 'Geoteknik', 'Stålkonstruktioner', 'Betonkonstruktioner', 'Varme'].some(keyword => 
          s.toLowerCase().includes(keyword.toLowerCase()))),
      'Semester 3 - Industribyggeri': specializations.filter(s => 
        ['Installationer', 'Materialelære', 'Byggeledelse', 'Betonelementer', 'Brand', 'Trækonstruktioner'].some(keyword => 
          s.toLowerCase().includes(keyword.toLowerCase()))),
      'Semester 2 - Lavt boligbyggeri': specializations.filter(s => 
        ['Bebyggelse', 'Lokalplan', 'Energi', 'Byggematerialer', 'Vej- og anlæg', 'Økonomi'].some(keyword => 
          s.toLowerCase().includes(keyword.toLowerCase()))),
      'Semester 1 - Grundlæggende ingeniørfag': specializations.filter(s => 
        ['Matematik', 'Teknisk tegning', 'Statik', 'Bygningskonstruktion', 'Projektarbejde', 'IT-værktøjer'].some(keyword => 
          s.toLowerCase().includes(keyword.toLowerCase())))
    };
    return semesterGroups;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-[#00A3E0] text-white rounded-lg hover:bg-[#0082B3] flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Tilføj uddannelse
        </button>
      </div>

      {(isAddingNew || editingId) && editedEducation && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Uddannelse</label>
              <input
                type="text"
                value={editedEducation?.degree || ''}
                onChange={(e) => setEditedEducation(prev => prev ? { ...prev, degree: e.target.value } : null)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Institution</label>
              <input
                type="text"
                value={editedEducation?.institution || ''}
                onChange={(e) => setEditedEducation(prev => prev ? { ...prev, institution: e.target.value } : null)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Lokation</label>
              <input
                type="text"
                value={editedEducation?.location || ''}
                onChange={(e) => setEditedEducation(prev => prev ? { ...prev, location: e.target.value } : null)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Beskrivelse</label>
              <textarea
                value={editedEducation?.description || ''}
                onChange={(e) => setEditedEducation(prev => prev ? { ...prev, description: e.target.value } : null)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg h-32"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Startår</label>
                <input
                  type="text"
                  value={editedEducation?.startDate || ''}
                  onChange={(e) => setEditedEducation(prev => prev ? { ...prev, startDate: e.target.value } : null)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                  placeholder="ÅÅÅÅ"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Slutår</label>
                <input
                  type="text"
                  value={editedEducation?.endDate || ''}
                  onChange={(e) => setEditedEducation(prev => prev ? { ...prev, endDate: e.target.value } : null)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                  placeholder="ÅÅÅÅ"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-600">Specialiseringer/Fag</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSpecialization}
                  onChange={(e) => setNewSpecialization(e.target.value)}
                  placeholder="Tilføj specialisering eller fag"
                  className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg"
                />
                <button
                  onClick={handleAddSpecialization}
                  className="px-4 py-2 bg-[#00A3E0] text-white rounded-lg hover:bg-[#0082B3]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <ul className="space-y-2">
                {editedEducation?.specialization?.map((spec, index) => (
                  <li key={index} className="flex items-center justify-between gap-2 p-2 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{spec}</span>
                    <button
                      onClick={() => handleRemoveSpecialization(index)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-2 mt-4">
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

      {education.map((entry) => (
        <div key={entry.id} className="group bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-[#00A3E0]">{entry.degree}</h3>
                  <button
                    onClick={() => handleEdit(entry)}
                    className="text-gray-400 hover:text-[#00A3E0] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-700 font-medium flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  {entry.institution}
                  {entry.location && `, ${entry.location}`}
                </p>
                <div className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600 flex items-center gap-2 whitespace-nowrap">
                  <Calendar className="w-4 h-4" />
                  <span>{entry.startDate} - {entry.endDate || 'Nu'}</span>
                </div>
              </div>
            </div>

            {entry.description && (
              <p className="text-gray-600 leading-relaxed mt-4">{entry.description}</p>
            )}

            {entry.specialization && entry.specialization.length > 0 && (
              <div className="mt-6 space-y-6">
                {Object.entries(groupBySemester(entry.specialization)).map(([semester, courses]) => 
                  courses.length > 0 && (
                    <div key={semester} className="space-y-3">
                      <h4 className="font-semibold text-gray-800 text-lg">{semester}</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {courses.map((course, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-[#00A3E0] rounded-full mt-2"></div>
                              <span className="text-gray-600 flex-1">{course}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}