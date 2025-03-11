import React from 'react';
import { Eye, Download, Target, TrendingUp } from 'lucide-react';

export function Analytics() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-700">Visninger</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">247</p>
          <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            +12% denne uge
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Download className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-700">Downloads</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">32</p>
          <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            +5% denne uge
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-700">Match Rate</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">89%</p>
          <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            +3% denne måned
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-700">Engagement</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">76%</p>
          <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            +8% denne måned
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Besøgsstatistik</h2>
        <div className="h-64 flex items-center justify-center border border-gray-100 rounded-lg">
          <p className="text-gray-500">Graf kommer snart</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Populære Sektioner</h2>
          <ul className="space-y-4">
            <li className="flex items-center justify-between">
              <span className="text-gray-600">Erhvervserfaring</span>
              <span className="text-sm font-medium text-gray-900">42%</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-600">Projekter</span>
              <span className="text-sm font-medium text-gray-900">28%</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-600">Kompetencer</span>
              <span className="text-sm font-medium text-gray-900">18%</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-600">Uddannelse</span>
              <span className="text-sm font-medium text-gray-900">12%</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Seneste Aktivitet</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-900 font-medium">CV blev vist</p>
                <p className="text-sm text-gray-500">For 2 timer siden</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Download className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-gray-900 font-medium">CV blev downloadet</p>
                <p className="text-sm text-gray-500">I går, 15:30</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}