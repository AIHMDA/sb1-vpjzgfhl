import React, { useState } from 'react';
import { Printer, FileDown, Settings } from 'lucide-react';

export function PrintCV() {
  const [showSettings, setShowSettings] = useState(false);
  const [format, setFormat] = useState<'A4' | 'A3'>('A4');
  const [template, setTemplate] = useState<'modern' | 'classic'>('modern');

  const handlePrint = () => {
    const style = document.createElement('style');
    style.textContent = `
      @page {
        size: ${format};
        margin: 2cm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .no-print {
          display: none !important;
        }
        .print-section {
          break-inside: avoid;
          page-break-inside: avoid;
        }
      }
    `;
    document.head.appendChild(style);
    window.print();
    document.head.removeChild(style);
  };

  const handleExport = (type: 'pdf' | 'docx') => {
    // TODO: Implement export functionality
    console.log(`Exporting as ${type}...`);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end space-y-2">
        {showSettings && (
          <div className="bg-white rounded-lg shadow-lg p-4 mb-2 min-w-[200px]">
            <h3 className="font-semibold text-gray-800 mb-4">Indstillinger</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Format</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as 'A4' | 'A3')}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                >
                  <option value="A4">A4</option>
                  <option value="A3">A3</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Skabelon</label>
                <select
                  value={template}
                  onChange={(e) => setTemplate(e.target.value as 'modern' | 'classic')}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg"
                >
                  <option value="modern">Moderne</option>
                  <option value="classic">Klassisk</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleExport('pdf')}
                  className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2"
                >
                  <FileDown className="w-4 h-4" />
                  PDF
                </button>
                <button
                  onClick={() => handleExport('docx')}
                  className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2"
                >
                  <FileDown className="w-4 h-4" />
                  Word
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={handlePrint}
            className="p-3 bg-[#00A3E0] text-white rounded-full hover:bg-[#0082B3] shadow-lg"
          >
            <Printer className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}