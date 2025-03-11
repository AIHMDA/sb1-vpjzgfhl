import React, { useState } from 'react';
import { Award, Building2, Calendar, Edit2, Check, Plus, X, Search } from 'lucide-react';
import type { Certificate } from '../types/cv';
import { useCVStore } from '../store/cvStore';

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export function CertificatesSection({ certificates }: CertificatesSectionProps) {
  const { updateCertificate, addCertificate } = useCVStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedCertificate, setEditedCertificate] = useState<Certificate | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleEdit = (certificate: Certificate) => {
    setEditingId(certificate.id);
    setEditedCertificate({ ...certificate });
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditedCertificate({
      id: '',
      title: '',
      provider: '',
      issueDate: ''
    });
  };

  const handleSave = () => {
    if (editedCertificate) {
      if (isAddingNew) {
        addCertificate(editedCertificate);
        setIsAddingNew(false);
      } else {
        updateCertificate(editedCertificate.id, editedCertificate);
      }
      setEditingId(null);
      setEditedCertificate(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedCertificate(null);
    setIsAddingNew(false);
  };

  const filteredCertificates = certificates.filter(cert => 
    cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Søg efter certifikater..."
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
            Tilføj certifikat
          </button>
        </div>
      </div>

      {(isAddingNew || editingId) && editedCertificate && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Titel</label>
              <input
                type="text"
                value={editedCertificate?.title || ''}
                onChange={(e) => setEditedCertificate(prev => prev ? { ...prev, title: e.target.value } : null)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Udbyder</label>
              <input
                type="text"
                value={editedCertificate?.provider || ''}
                onChange={(e) => setEditedCertificate(prev => prev ? { ...prev, provider: e.target.value } : null)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Certifikatnummer</label>
              <input
                type="text"
                value={editedCertificate?.certificateNumber || ''}
                onChange={(e) => setEditedCertificate(prev => prev ? { ...prev, certificateNumber: e.target.value } : null)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Udstedelsesdato</label>
                <input
                  type="date"
                  value={editedCertificate?.issueDate || ''}
                  onChange={(e) => setEditedCertificate(prev => prev ? { ...prev, issueDate: e.target.value } : null)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Udløbsdato</label>
                <input
                  type="date"
                  value={editedCertificate?.expiryDate || ''}
                  onChange={(e) => setEditedCertificate(prev => prev ? { ...prev, expiryDate: e.target.value } : null)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Beskrivelse</label>
              <textarea
                value={editedCertificate?.description || ''}
                onChange={(e) => setEditedCertificate(prev => prev ? { ...prev, description: e.target.value } : null)}
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
        {filteredCertificates.map((certificate) => (
          <div key={certificate.id} className="group bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
            {editingId === certificate.id ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Titel</label>
                  <input
                    type="text"
                    value={editedCertificate?.title || ''}
                    onChange={(e) => setEditedCertificate(prev => prev ? { ...prev, title: e.target.value } : null)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Udbyder</label>
                  <input
                    type="text"
                    value={editedCertificate?.provider || ''}
                    onChange={(e) => setEditedCertificate(prev => prev ? { ...prev, provider: e.target.value } : null)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Certifikatnummer</label>
                  <input
                    type="text"
                    value={editedCertificate?.certificateNumber || ''}
                    onChange={(e) => setEditedCertificate(prev => prev ? { ...prev, certificateNumber: e.target.value } : null)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Udstedelsesdato</label>
                    <input
                      type="date"
                      value={editedCertificate?.issueDate || ''}
                      onChange={(e) => setEditedCertificate(prev => prev ? { ...prev, issueDate: e.target.value } : null)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Udløbsdato</label>
                    <input
                      type="date"
                      value={editedCertificate?.expiryDate || ''}
                      onChange={(e) => setEditedCertificate(prev => prev ? { ...prev, expiryDate: e.target.value } : null)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Beskrivelse</label>
                  <textarea
                    value={editedCertificate?.description || ''}
                    onChange={(e) => setEditedCertificate(prev => prev ? { ...prev, description: e.target.value } : null)}
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
            ) : (
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#00A3E0]" />
                    {certificate.title}
                  </h3>
                  <button
                    onClick={() => handleEdit(certificate)}
                    className="text-gray-400 hover:text-[#00A3E0] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-600 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {certificate.provider}
                  </p>
                  <p className="text-gray-500 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {certificate.issueDate}
                    {certificate.expiryDate && ` - ${certificate.expiryDate}`}
                  </p>
                  {certificate.certificateNumber && (
                    <p className="text-gray-500">
                      #{certificate.certificateNumber}
                    </p>
                  )}
                  {certificate.description && (
                    <p className="text-gray-600 mt-2">{certificate.description}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}