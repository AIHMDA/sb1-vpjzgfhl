import React, { useState } from 'react';
import { Calendar, Building2, MapPin, Edit2, Check, Plus, X } from 'lucide-react';
import type { CareerEntry } from '../types/cv';
import { useCVStore } from '../store/cvStore';

// Predefinerede stillinger
const predefinedRoles = [
  "Projekterende fagprojektleder",
  "Fagprojektleder",
  "Projektleder",
  "Projekterings- og fagbyggeleder",
  "Afløbsingeniør",
  "Turnusingeniør",
  "Geografisk fagspecialist"
];

interface CareerSectionProps {
  entries: CareerEntry[];
}

export function CareerSection({ entries }: CareerSectionProps) {
  const { updateCareerEntry, addCareerEntry } = useCVStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedEntry, setEditedEntry] = useState<CareerEntry | null>(null);
  const [showRoleInput, setShowRoleInput] = useState(false);
  const [newRole, setNewRole] = useState("");
  const [newResponsibility, setNewResponsibility] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleEdit = (entry: CareerEntry) => {
    setEditingId(entry.id);
    setEditedEntry({ ...entry });
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditedEntry({
      id: '',
      startDate: '',
      endDate: null,
      role: '',
      company: '',
      description: '',
      responsibilities: []
    });
  };

  const handleSave = () => {
    if (editedEntry) {
      if (isAddingNew) {
        addCareerEntry(editedEntry);
        setIsAddingNew(false);
      } else {
        updateCareerEntry(editedEntry.id, editedEntry);
      }
      setEditingId(null);
      setEditedEntry(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedEntry(null);
    setIsAddingNew(false);
  };

  const handleSelectRole = (role: string) => {
    if (editedEntry) {
      setEditedEntry({ ...editedEntry, role });
      setShowRoleInput(false);
    }
  };

  const handleAddNewRole = () => {
    if (editedEntry && newRole.trim()) {
      setEditedEntry({ ...editedEntry, role: newRole.trim() });
      setNewRole("");
      setShowRoleInput(false);
    }
  };

  const handleAddResponsibility = () => {
    if (editedEntry && newResponsibility.trim()) {
      const updatedResponsibilities = [...(editedEntry.responsibilities || []), newResponsibility.trim()];
      setEditedEntry({ ...editedEntry, responsibilities: updatedResponsibilities });
      setNewResponsibility("");
    }
  };

  const handleRemoveResponsibility = (index: number) => {
    if (editedEntry) {
      const updatedResponsibilities = editedEntry.responsibilities.filter((_, i) => i !== index);
      setEditedEntry({ ...editedEntry, responsibilities: updatedResponsibilities });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-[#00A3E0] text-white rounded-lg hover:bg-[#0082B3] flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Tilføj karriereforløb
        </button>
      </div>

      {(isAddingNew || editingId) && editedEntry && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-4 flex-1 mr-4">
                {/* Role Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Stilling</label>
                  {showRoleInput ? (
                    <div className="space-y-2">
                      <select
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                        onChange={(e) => {
                          if (e.target.value) handleSelectRole(e.target.value);
                        }}
                        value=""
                      >
                        <option value="">Vælg fra liste</option>
                        {predefinedRoles.map((role) => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                      
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value)}
                          placeholder="Eller skriv ny stilling"
                          className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg"
                        />
                        <button
                          onClick={handleAddNewRole}
                          className="px-4 py-2 bg-[#00A3E0] text-white rounded-lg hover:bg-[#0082B3]"
                        >
                          Tilføj
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editedEntry?.role || ''}
                        readOnly
                        className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg"
                      />
                      <button
                        onClick={() => setShowRoleInput(true)}
                        className="px-3 py-2 text-[#00A3E0] hover:bg-blue-50 rounded-lg"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Virksomhed</label>
                  <input
                    type="text"
                    value={editedEntry?.company || ''}
                    onChange={(e) => setEditedEntry(prev => prev ? { ...prev, company: e.target.value } : null)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Lokation</label>
                  <input
                    type="text"
                    value={editedEntry?.location || ''}
                    onChange={(e) => setEditedEntry(prev => prev ? { ...prev, location: e.target.value } : null)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                  />
                </div>

                {/* Department */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Afdeling</label>
                  <input
                    type="text"
                    value={editedEntry?.department || ''}
                    onChange={(e) => setEditedEntry(prev => prev ? { ...prev, department: e.target.value } : null)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Beskrivelse</label>
                  <textarea
                    value={editedEntry?.description || ''}
                    onChange={(e) => setEditedEntry(prev => prev ? { ...prev, description: e.target.value } : null)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg h-32"
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Startdato</label>
                    <input
                      type="month"
                      value={editedEntry?.startDate || ''}
                      onChange={(e) => setEditedEntry(prev => prev ? { ...prev, startDate: e.target.value } : null)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Slutdato</label>
                    <input
                      type="month"
                      value={editedEntry?.endDate || ''}
                      onChange={(e) => setEditedEntry(prev => prev ? { ...prev, endDate: e.target.value } : null)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                    />
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-600">Hovedansvar</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newResponsibility}
                      onChange={(e) => setNewResponsibility(e.target.value)}
                      placeholder="Tilføj nyt ansvarsområde"
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
                    {editedEntry?.responsibilities?.map((resp, index) => (
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
              </div>
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

      {entries.map((entry) => (
        <div key={entry.id} className="group bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          {editingId === entry.id ? (
            // Editing Mode
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-4 flex-1 mr-4">
                  {/* Role Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Stilling</label>
                    {showRoleInput ? (
                      <div className="space-y-2">
                        <select
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                          onChange={(e) => {
                            if (e.target.value) handleSelectRole(e.target.value);
                          }}
                          value=""
                        >
                          <option value="">Vælg fra liste</option>
                          {predefinedRoles.map((role) => (
                            <option key={role} value={role}>{role}</option>
                          ))}
                        </select>
                        
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                            placeholder="Eller skriv ny stilling"
                            className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg"
                          />
                          <button
                            onClick={handleAddNewRole}
                            className="px-4 py-2 bg-[#00A3E0] text-white rounded-lg hover:bg-[#0082B3]"
                          >
                            Tilføj
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editedEntry?.role || ''}
                          readOnly
                          className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg"
                        />
                        <button
                          onClick={() => setShowRoleInput(true)}
                          className="px-3 py-2 text-[#00A3E0] hover:bg-blue-50 rounded-lg"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Virksomhed</label>
                    <input
                      type="text"
                      value={editedEntry?.company || ''}
                      onChange={(e) => setEditedEntry(prev => prev ? { ...prev, company: e.target.value } : null)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Lokation</label>
                    <input
                      type="text"
                      value={editedEntry?.location || ''}
                      onChange={(e) => setEditedEntry(prev => prev ? { ...prev, location: e.target.value } : null)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                    />
                  </div>

                  {/* Department */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Afdeling</label>
                    <input
                      type="text"
                      value={editedEntry?.department || ''}
                      onChange={(e) => setEditedEntry(prev => prev ? { ...prev, department: e.target.value } : null)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Beskrivelse</label>
                    <textarea
                      value={editedEntry?.description || ''}
                      onChange={(e) => setEditedEntry(prev => prev ? { ...prev, description: e.target.value } : null)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg h-32"
                    />
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Startdato</label>
                      <input
                        type="month"
                        value={editedEntry?.startDate || ''}
                        onChange={(e) => setEditedEntry(prev => prev ? { ...prev, startDate: e.target.value } : null)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Slutdato</label>
                      <input
                        type="month"
                        value={editedEntry?.endDate || ''}
                        onChange={(e) => setEditedEntry(prev => prev ? { ...prev, endDate: e.target.value } : null)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="space-y-4">
                    <label className="text-sm font-medium text-gray-600">Hovedansvar</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newResponsibility}
                        onChange={(e) => setNewResponsibility(e.target.value)}
                        placeholder="Tilføj nyt ansvarsområde"
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
                      {editedEntry?.responsibilities?.map((resp, index) => (
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
                </div>
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
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-[#00A3E0]">{entry.role}</h3>
                  <p className="text-gray-700 font-medium flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {entry.company}
                  </p>
                  {entry.location && (
                    <p className="text-gray-500 text-sm flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {entry.location}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <div className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600 flex items-center gap-2 whitespace-nowrap">
                    <Calendar className="w-4 h-4" />
                    <span>{entry.startDate} - {entry.endDate || 'Nu'}</span>
                  </div>
                  <button
                    onClick={() => handleEdit(entry)}
                    className="text-gray-400 hover:text-[#00A3E0] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {entry.department && (
                <p className="text-gray-600 mb-4">{entry.department}</p>
              )}
              {entry.description && (
                <p className="text-gray-600 mb-4">{entry.description}</p>
              )}
              {entry.responsibilities && entry.responsibilities.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Hovedansvar:</h4>
                  <ul className="space-y-2">
                    {entry.responsibilities.map((resp, idx) => (
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
      ))}
    </div>
  );
}