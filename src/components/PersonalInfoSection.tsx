import React, { useRef, useState } from 'react';
import { User, Camera, Award, Edit2, Check, Plus, X } from 'lucide-react';
import type { PersonalInfo } from '../types/cv';
import { useCVStore } from '../store/cvStore';

// Prædefinerede kompetencer
const predefinedCompetencies = [
  "Projektledelse og koordinering",
  "Fagprojektledelse inden for jord og afvanding",
  "Detailprojektering af bane- og vejafvanding",
  "3D-modellering og teknisk tegning",
  "Kvalitetssikring og dokumentation",
  "Fagtilsyn og byggeledelse",
  "Myndighedsbehandling og tilladelser",
  "Udbudsmateriale og kontraktstyring",
  "Geotekniske undersøgelser og vurderinger",
  "Sporprojektering og -fornyelse",
  "Ledningsomlægninger og -koordinering",
  "Bygbarhedsvurdering og risikoanalyse",
  "CSM-proces og sikkerhedsvurdering",
  "Interessenthåndtering",
  "Tværfaglig koordinering",
  "Budgetstyring og økonomiopfølgning",
  "Hydrauliske beregninger og dimensionering",
  "Miljøvurderinger og -undersøgelser",
  "Afløbstekniske beregninger",
  "BIM og digitale værktøjer"
];

interface PersonalInfoSectionProps {
  info: PersonalInfo;
  cvNumber?: string;
}

export function PersonalInfoSection({ info, cvNumber = "01" }: PersonalInfoSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updatePersonalInfo } = useCVStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(info);
  const [showCompetencyInput, setShowCompetencyInput] = useState(false);
  const [newCompetency, setNewCompetency] = useState("");

  const handleSave = () => {
    updatePersonalInfo(editedInfo);
    setIsEditing(false);
  };

  const handleAddCompetency = () => {
    if (newCompetency.trim()) {
      const updatedCompetencies = [...editedInfo.competencies, newCompetency.trim()];
      setEditedInfo({ ...editedInfo, competencies: updatedCompetencies });
      setNewCompetency("");
    }
  };

  const handleSelectCompetency = (competency: string) => {
    if (!editedInfo.competencies.includes(competency)) {
      const updatedCompetencies = [...editedInfo.competencies, competency];
      setEditedInfo({ ...editedInfo, competencies: updatedCompetencies });
    }
  };

  const handleRemoveCompetency = (index: number) => {
    const updatedCompetencies = editedInfo.competencies.filter((_, i) => i !== index);
    setEditedInfo({ ...editedInfo, competencies: updatedCompetencies });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white">
        <div className="flex justify-between items-start gap-8">
          <div className="flex-1">
            {/* CV Number Selector */}
            <div className="mb-4 flex items-center gap-3">
              <label htmlFor="cvNumber" className="text-sm font-medium">
                CV nr.
              </label>
              <select
                id="cvNumber"
                value={cvNumber}
                onChange={(e) => updatePersonalInfo({ cvNumber: e.target.value })}
                className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-[#00A3E0] focus:border-transparent"
              >
                {Array.from({ length: 99 }, (_, i) => 
                  (i + 1).toString().padStart(2, '0')
                ).map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            
            {isEditing ? (
              <input
                type="text"
                value={editedInfo.fullName}
                onChange={(e) => setEditedInfo({ ...editedInfo, fullName: e.target.value })}
                className="text-3xl font-bold mb-2 bg-gray-800 text-white border border-gray-700 rounded px-2 py-1 w-full"
              />
            ) : (
              <h1 className="text-3xl font-bold mb-2">{info.fullName}</h1>
            )}
            
            {isEditing ? (
              <input
                type="text"
                value={editedInfo.currentRole}
                onChange={(e) => setEditedInfo({ ...editedInfo, currentRole: e.target.value })}
                className="text-lg bg-gray-800 text-gray-300 border border-gray-700 rounded px-2 py-1 w-full"
              />
            ) : (
              <p className="text-gray-300 text-lg">{info.currentRole}</p>
            )}
          </div>

          {/* Profile Image */}
          <div className="relative group">
            <div className="w-48 h-48 overflow-hidden rounded-xl shadow-lg border-4 border-white">
              {info.profileImage ? (
                <img 
                  src={info.profileImage} 
                  alt={info.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <User className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-6">
        {/* Personal Details */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Nationalitet</label>
            {isEditing ? (
              <input
                type="text"
                value={editedInfo.nationality}
                onChange={(e) => setEditedInfo({ ...editedInfo, nationality: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
              />
            ) : (
              <p className="text-gray-900">{info.nationality}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="seniority" className="text-sm font-medium text-gray-600">Anciennitet</label>
            <select
              id="seniority"
              value={info.seniority?.replace(',', '.')}
              onChange={(e) => updatePersonalInfo({ seniority: e.target.value.replace('.', ',') })}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00A3E0] focus:border-transparent"
            >
              {Array.from({ length: 80 }, (_, i) => i * 0.5 + 0.5).map(year => (
                <option key={year} value={year}>
                  {year.toString().replace('.', ',')} år
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#FF6B00]" />
            Resumé
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="ml-auto text-gray-500 hover:text-gray-700"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}
          </h3>
          {isEditing ? (
            <div className="space-y-4">
              <textarea
                value={editedInfo.professionalSummary}
                onChange={(e) => setEditedInfo({ ...editedInfo, professionalSummary: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg h-40"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditing(false)}
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
            <p className="text-gray-600 leading-relaxed">{info.professionalSummary}</p>
          )}
        </div>

        {/* Key Competencies */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#FF6B00]" />
              Nøglekompetencer
            </h3>
            <button
              onClick={() => setShowCompetencyInput(!showCompetencyInput)}
              className="px-3 py-1 text-[#00A3E0] hover:bg-blue-50 rounded-lg flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Tilføj kompetence
            </button>
          </div>

          {showCompetencyInput && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h4 className="font-medium text-gray-700 mb-2">Vælg eller tilføj ny kompetence</h4>
              <div className="space-y-4">
                <select
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                  onChange={(e) => {
                    if (e.target.value) {
                      handleSelectCompetency(e.target.value);
                      e.target.value = '';
                    }
                  }}
                >
                  <option value="">Vælg fra liste</option>
                  {predefinedCompetencies
                    .filter(comp => !editedInfo.competencies.includes(comp))
                    .map((comp, index) => (
                      <option key={index} value={comp}>{comp}</option>
                    ))}
                </select>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCompetency}
                    onChange={(e) => setNewCompetency(e.target.value)}
                    placeholder="Eller skriv ny kompetence"
                    className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg"
                  />
                  <button
                    onClick={handleAddCompetency}
                    className="px-4 py-2 bg-[#00A3E0] text-white rounded-lg hover:bg-[#0082B3]"
                  >
                    Tilføj
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {editedInfo.competencies.map((competency, index) => (
              <div 
                key={index}
                className="group flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-2 h-2 bg-[#00A3E0] rounded-full"></div>
                <p className="text-gray-700 flex-1">{competency}</p>
                <button
                  onClick={() => handleRemoveCompetency(index)}
                  className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}