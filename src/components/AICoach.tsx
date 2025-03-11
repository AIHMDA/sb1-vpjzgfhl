import React from 'react';
import { Sparkles, BookOpen, Target, Award } from 'lucide-react';

export function AICoach() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[#FF6B00]" />
          AI Karriere Coach
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#00A3E0]" />
              Kompetenceanalyse
            </h3>
            <p className="text-gray-600">
              Få en detaljeret analyse af dine kompetencer og forslag til forbedringer.
            </p>
            <button className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Start Analyse
            </button>
          </div>

          <div className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#00A3E0]" />
              Karrierevejledning
            </h3>
            <p className="text-gray-600">
              Få personlige anbefalinger til din næste karrieremulighed.
            </p>
            <button className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Se Muligheder
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#FF6B00]" />
            Anbefalede Forbedringer
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <Sparkles className="w-5 h-5 text-[#00A3E0] mt-1" />
              <div>
                <p className="font-medium">Tilføj flere tekniske kompetencer</p>
                <p className="text-sm text-gray-600">Dette vil øge din synlighed for tekniske stillinger.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <Sparkles className="w-5 h-5 text-[#00A3E0] mt-1" />
              <div>
                <p className="font-medium">Udvid projektbeskrivelser</p>
                <p className="text-sm text-gray-600">Tilføj flere detaljer om dine resultater og impact.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}