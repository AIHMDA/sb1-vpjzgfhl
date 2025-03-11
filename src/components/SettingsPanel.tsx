import React from 'react';
import { Moon, Sun, Globe, Bell, Shield, User } from 'lucide-react';

export function SettingsPanel() {
  return (
    <div className="max-w-4xl space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Indstillinger</h2>

        <div className="space-y-8">
          {/* Appearance */}
          <section>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Udseende</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Sun className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-800">Tema</p>
                    <p className="text-sm text-gray-500">Vælg mellem lyst og mørkt tema</p>
                  </div>
                </div>
                <select className="px-3 py-2 rounded-lg border border-gray-200 bg-white">
                  <option value="light">Lyst</option>
                  <option value="dark">Mørkt</option>
                  <option value="system">System</option>
                </select>
              </div>
            </div>
          </section>

          {/* Language */}
          <section>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Sprog</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-800">Sprog</p>
                    <p className="text-sm text-gray-500">Vælg dit foretrukne sprog</p>
                  </div>
                </div>
                <select className="px-3 py-2 rounded-lg border border-gray-200 bg-white">
                  <option value="da">Dansk</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Notifikationer</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-800">Email Notifikationer</p>
                    <p className="text-sm text-gray-500">Modtag opdateringer via email</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Privacy */}
          <section>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Privatliv</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-800">Profil Synlighed</p>
                    <p className="text-sm text-gray-500">Kontroller hvem der kan se dit CV</p>
                  </div>
                </div>
                <select className="px-3 py-2 rounded-lg border border-gray-200 bg-white">
                  <option value="public">Offentlig</option>
                  <option value="private">Privat</option>
                  <option value="connections">Kun Forbindelser</option>
                </select>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}