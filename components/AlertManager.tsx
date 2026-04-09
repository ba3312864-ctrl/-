
import React, { useState } from 'react';
import { UserRegion, Reminder, Language, CropInfo } from '../types';
import { UI_STRINGS } from '../locales';
import { ALGERIAN_CROPS } from '../constants';

interface AlertManagerProps {
  lang: Language;
  region: UserRegion;
  setRegion: (region: UserRegion) => void;
  reminders: Reminder[];
  onToggleReminder: (cropId: string) => void;
  onClose: () => void;
}

const AlertManager: React.FC<AlertManagerProps> = ({ lang, region, setRegion, reminders, onToggleReminder, onClose }) => {
  const t = UI_STRINGS[lang];
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>(Notification.permission);

  const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    setPermissionStatus(permission);
  };

  const getCropName = (id: string) => {
    const crop = ALGERIAN_CROPS.find(c => c.id === id);
    return lang === 'ar' ? crop?.name_ar : crop?.name_en;
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="p-6 bg-emerald-800 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span>🔔</span> {t.alertsTitle}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-emerald-700 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Region Selector */}
          <section>
            <h3 className="text-sm font-bold text-stone-500 mb-4 uppercase tracking-wider">{t.selectRegion}</h3>
            <div className="grid grid-cols-1 gap-2">
              {(['north', 'highlands', 'sahara'] as UserRegion[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRegion(r)}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                    region === r ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-stone-100 hover:border-emerald-200 text-stone-600'
                  }`}
                >
                  <span className="font-bold">{t[r]}</span>
                  {region === r && <span className="text-emerald-500">✓</span>}
                </button>
              ))}
            </div>
          </section>

          {/* Notification Permission */}
          <section className="bg-stone-50 p-5 rounded-2xl border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bold text-stone-800">{t.enableNotifications}</h4>
                <p className="text-xs text-stone-500">
                  {permissionStatus === 'granted' ? t.notificationsEnabled : t.notificationsDisabled}
                </p>
              </div>
              {permissionStatus !== 'granted' && (
                <button
                  onClick={requestNotificationPermission}
                  className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  {t.enableNotifications}
                </button>
              )}
            </div>
          </section>

          {/* Active Reminders */}
          <section>
            <h3 className="text-sm font-bold text-stone-500 mb-4 uppercase tracking-wider">{t.activeAlerts}</h3>
            {reminders.length > 0 ? (
              <div className="space-y-2">
                {reminders.map((rem) => (
                  <div key={rem.cropId} className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                    <span className="font-medium text-emerald-900">{getCropName(rem.cropId)}</span>
                    <button 
                      onClick={() => onToggleReminder(rem.cropId)}
                      className="text-red-500 hover:text-red-700 text-xs font-bold"
                    >
                      {t.stopReminding}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-stone-400 text-sm italic">لا توجد تنبيهات نشطة حالياً.</p>
            )}
          </section>
        </div>

        <div className="p-4 border-t border-stone-100 bg-stone-50 flex justify-end">
          <button onClick={onClose} className="px-6 py-2 bg-stone-800 text-white rounded-xl font-bold">{t.close}</button>
        </div>
      </div>
    </div>
  );
};

export default AlertManager;
