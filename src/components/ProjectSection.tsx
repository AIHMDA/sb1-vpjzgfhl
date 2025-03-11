import React, { useState } from 'react';
import { Briefcase, Calendar, Building, Edit2, Check, Plus, X, ChevronDown, ChevronUp } from 'lucide-react';
import type { ProjectEntry } from '../types/cv';
import { useCVStore } from '../store/cvStore';

// Predefinerede klienter
const predefinedClients = [
  "Banedanmark",
  "Lokaltog",
  "NNE A/S",
  "COWI",
  "Novo Nordisk",
  "Vejdirektoratet",
  "Kalundborg Kommune",
  "DSB",
  "Hovedstadens Letbane",
  "Metroselskabet"
];

// Predefinerede ansvarsområder
const predefinedResponsibilities = [
  "Fagledelse og styring af tid, økonomi og ressourcer",
  "Detailprojektering af bane- og vejafvanding",
  "Koordinering med interessenter",
  "Fagtilsyn og kvalitetssikring",
  "Udarbejdelse af 2D- og 3D-modeller",
  "Håndtering af dispensationsansøgninger",
  "Design af nye drænsystemer",
  "Bygbarhedsvurdering",
  "Grænsefladekoordinering",
  "Materiale- og mængdekontrol",
  "Kvalitetssikring via Dalux",
  "CSM-proces og sikkerhedsvurdering",
  "Myndighedsbehandling",
  "Hydrauliske beregninger",
  "Udarbejdelse af udbudsmateriale"
];

interface ProjectSectionProps {
  projects: ProjectEntry[];
}

export function ProjectSection({ projects }: ProjectSectionProps) {
  const { updateProjectEntry, addProjectEntry } = useCVStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedProject, setEditedProject] = useState<ProjectEntry | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [newResponsibility, setNewResponsibility] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleEdit = (project: ProjectEntry) => {
    setEditingId(project.id);
    setEditedProject({ ...project });
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditedProject({
      id: '',
      title: '',
      role: '',
      startDate: '',
      endDate: null,
      description: '',
      responsibilities: []
    });
  };

  const handleSave = () => {
    if (editedProject) {
      if (isAddingNew) {
        addProjectEntry(editedProject);
        setIsAddingNew(false);
      } else {
        updateProjectEntry(editedProject.id, editedProject);
      }
      setEditingId(null);
      setEditedProject(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedProject(null);
    setIsAddingNew(false);
  };

  const handleAddResponsibility = () => {
    if (editedProject && newResponsibility.trim()) {
      const updatedResponsibilities = [...editedProject.responsibilities, newResponsibility.trim()];
      setEditedProject({ ...editedProject, responsibilities: updatedResponsibilities });
      setNewResponsibility("");
    }
  };

  const handleRemoveResponsibility = (index: number) => {
    if (editedProject) {
      const updatedResponsibilities = editedProject.responsibilities.filter((_, i) => i !== index);
      setEditedProject({ ...editedProject, responsibilities: updatedResponsibilities });
    }
  };

  const toggleProjectExpansion = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-[#00A3E0] text-white rounded-lg hover:bg-[#0082B3] flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Tilføj projekt
        </button>
      </div>

      {(isAddingNew || editingId) && editedProject && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="space-y-4">
            {/* Project Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Projekttitel</label>
              <input
                type="text"
                value={editedProject?.title || ''}
                onChange={(e) => setEditedProject(prev => prev ? { ...prev, title: e.target.value } : null)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
              />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Rolle</label>
              <input
                type="text"
                value={editedProject?.role || ''}
                onChange={(e) => setEditedProject(prev => prev ? { ...prev, role: e.target.value } : null)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
              />
            </div>

            {/* Client */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Klient</label>
              <select
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                value={editedProject?.client || ''}
                onChange={(e) => setEditedProject(prev => prev ? { ...prev, client: e.target.value } : null)}
              >
                <option value="">Vælg klient</option>
                {predefinedClients.map(client => (
                  <option key={client} value={client}>{client}</option>
                ))}
              </select>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Startdato</label>
                <input
                  type="month"
                  value={editedProject?.startDate || ''}
                  onChange={(e) => setEditedProject(prev => prev ? { ...prev, startDate: e.target.value } : null)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Slutdato</label>
                <input
                  type="month"
                  value={editedProject?.endDate || ''}
                  onChange={(e) => setEditedProject(prev => prev ? { ...prev, endDate: e.target.value } : null)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Beskrivelse</label>
              <textarea
                value={editedProject?.description || ''}
                onChange={(e) => setEditedProject(prev => prev ? { ...prev, description: e.target.value } : null)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg h-32"
              />
            </div>

            {/* Responsibilities */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-600">Hovedansvar</label>
              <select
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                onChange={(e) => {
                  if (e.target.value) {
                    setNewResponsibility(e.target.value);
                    handleAddResponsibility();
                    e.target.value = '';
                  }
                }}
                value=""
              >
                <option value="">Vælg fra liste</option>
                {predefinedResponsibilities
                  .filter(resp => !editedProject?.responsibilities.includes(resp))
                  .map((resp) => (
                    <option key={resp} value={resp}>{resp}</option>
                  ))}
              </select>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newResponsibility}
                  onChange={(e) => setNewResponsibility(e.target.value)}
                  placeholder="Eller skriv nyt ansvarsområde"
                  className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg"
                />
                <button
                  onClick={handleAddResponsibility}
                  className="px-4 py-2 bg-[#00A3E0] text-white rounded-lg hover:bg-[#0082B3]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <ul className="space-y-2">
                {editedProject?.responsibilities.map((resp, index) => (
                  <li key={index} className="flex items-center justify-between gap-2 p-2 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{resp}</span>
                    <button
                      onClick={() => handleRemoveResponsibility(index)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
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

      {projects.map((project) => (
        <div key={project.id} className="group bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          {editingId === project.id ? (
            // Editing Mode
            <div className="space-y-4">
              {/* Project Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Projekttitel</label>
                <input
                  type="text"
                  value={editedProject?.title || ''}
                  onChange={(e) => setEditedProject(prev => prev ? { ...prev, title: e.target.value } : null)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                />
              </div>

              {/* Role */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Rolle</label>
                <input
                  type="text"
                  value={editedProject?.role || ''}
                  onChange={(e) => setEditedProject(prev => prev ? { ...prev, role: e.target.value } : null)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                />
              </div>

              {/* Client */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Klient</label>
                <select
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                  value={editedProject?.client || ''}
                  onChange={(e) => setEditedProject(prev => prev ? { ...prev, client: e.target.value } : null)}
                >
                  <option value="">Vælg klient</option>
                  {predefinedClients.map(client => (
                    <option key={client} value={client}>{client}</option>
                  ))}
                </select>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Startdato</label>
                  <input
                    type="month"
                    value={editedProject?.startDate || ''}
                    onChange={(e) => setEditedProject(prev => prev ? { ...prev, startDate: e.target.value } : null)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Slutdato</label>
                  <input
                    type="month"
                    value={editedProject?.endDate || ''}
                    onChange={(e) => setEditedProject(prev => prev ? { ...prev, endDate: e.target.value } : null)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Beskrivelse</label>
                <textarea
                  value={editedProject?.description || ''}
                  onChange={(e) => setEditedProject(prev => prev ? { ...prev, description: e.target.value } : null)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg h-32"
                />
              </div>

              {/* Responsibilities */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-600">Hovedansvar</label>
                <select
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                  onChange={(e) => {
                    if (e.target.value) {
                      setNewResponsibility(e.target.value);
                      handleAddResponsibility();
                      e.target.value = '';
                    }
                  }}
                  value=""
                >
                  <option value="">Vælg fra liste</option>
                  {predefinedResponsibilities
                    .filter(resp => !editedProject?.responsibilities.includes(resp))
                    .map((resp) => (
                      <option key={resp} value={resp}>{resp}</option>
                    ))}
                </select>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newResponsibility}
                    onChange={(e) => setNewResponsibility(e.target.value)}
                    placeholder="Eller skriv nyt ansvarsområde"
                    className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg"
                  />
                  <button
                    onClick={handleAddResponsibility}
                    className="px-4 py-2 bg-[#00A3E0] text-white rounded-lg hover:bg-[#0082B3]"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <ul className="space-y-2">
                  {editedProject?.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-center justify-between gap-2 p-2 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{resp}</span>
                      <button
                        onClick={() => handleRemoveResponsibility(index)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
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
          ) : (
            // Display Mode
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-[#00A3E0]">{project.title}</h3>
                    <button
                      onClick={() => handleEdit(project)}
                      className="text-gray-400 hover:text-[#00A3E0] opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-700 font-medium">Rolle: {project.role}</p>
                  {project.client && (
                    <p className="text-gray-600 text-sm flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Klient: {project.client}
                    </p>
                  )}
                </div>
                <div className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600 flex items-center gap-2 whitespace-nowrap">
                  <Calendar className="w-4 h-4" />
                  <span>{project.startDate} - {project.endDate || 'Nu'}</span>
                </div>
              </div>

              <button
                onClick={() => toggleProjectExpansion(project.id)}
                className="w-full mt-4 text-left flex items-center justify-between text-gray-600 hover:text-[#00A3E0]"
              >
                <span className="font-medium">
                  {expandedProject === project.id ? 'Skjul detaljer' : 'Vis detaljer'}
                </span>
                {expandedProject === project.id ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {expandedProject === project.id && (
                <div className="mt-4 space-y-4">
                  <p className="text-gray-600 leading-relaxed">{project.description}</p>
                  
                  {project.responsibilities && project.responsibilities.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Hovedansvar:</h4>
                      <ul className="space-y-2">
                        {project.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#00A3E0] rounded-full mt-2"></div>
                            <span className="text-gray-600 flex-1">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}