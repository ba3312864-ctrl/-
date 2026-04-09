
import React, { useState, useEffect, useMemo } from 'react';
import { ALGERIAN_CROPS, SEASONAL_GUIDE } from './constants';
import CropCard from './components/CropCard';
import SeasonVisualizer from './SeasonVisualizer';
import CropDetailsModal from './components/CropDetailsModal';
import AlertManager from './components/AlertManager';
import FeedbackModal from './FeedbackModal';
import LibraryModal from './components/LibraryModal';
import { CropInfo, Language, UserRegion, Reminder, CropCategory } from './types';
import { UI_STRINGS } from './locales';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar');
  const [activeSeason, setActiveSeason] = useState(0);
  const [selectedCrop, setSelectedCrop] = useState<CropInfo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [region, setRegion] = useState<UserRegion>(() => {
    const saved = localStorage.getItem('agri_region');
    return (saved as UserRegion) || 'north';
  });

  const [selectedCategory, setSelectedCategory] = useState<CropCategory | 'all'>('all');
  const [useSeasonalFilter, setUseSeasonalFilter] = useState(true);

  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const saved = localStorage.getItem('agri_reminders');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isAlertPanelOpen, setIsAlertPanelOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const t = UI_STRINGS[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('agri_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('agri_region', region);
  }, [region]);

  const toggleLang = () => {
    setLang(prev => {
      if (prev === 'ar') return 'en';
      if (prev === 'en') return 'fr';
      return 'ar';
    });
  };

  const filteredCrops = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return ALGERIAN_CROPS.filter(crop => {
      const name = lang === 'ar' ? crop.name_ar : lang === 'en' ? crop.name_en : crop.name_fr;
      const matchesSearch = !query || name.toLowerCase().includes(query);
      const matchesCategory = selectedCategory === 'all' || crop.type === selectedCategory;
      const matchesSeason = !useSeasonalFilter || crop.seasonalCategory.includes(activeSeason);
      return matchesSearch && matchesCategory && matchesSeason;
    });
  }, [searchQuery, selectedCategory, useSeasonalFilter, activeSeason, lang]);

  const toggleReminder = (cropId: string) => {
    setReminders(prev => {
      const exists = prev.find(r => r.cropId === cropId);
      if (exists) return prev.filter(r => r.cropId !== cropId);
      return [...prev, { cropId, type: 'planting', enabled: true }];
    });
  };

  const categories: {id: CropCategory | 'all', label: string, icon: string}[] = [
    { id: 'all', label: lang === 'ar' ? 'الكل' : lang === 'en' ? 'All' : 'Tout', icon: '🔍' },
    { id: 'grain', label: t.grain, icon: '🌾' },
    { id: 'vegetable', label: t.vegetable, icon: '🥕' },
    { id: 'fruit', label: t.fruit, icon: '🍎' },
    { id: 'legume', label: t.legume, icon: '🍲' },
  ];

  return (
    <div className={`min-h-screen pb-12 font-sans bg-stone-50 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
      <header className="bg-emerald-800 text-white py-12 px-4 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-700/40 rounded-full -mr-48 -mt-48 blur-3xl animate-pulse"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex justify-between items-center mb-10">
            <div className="flex gap-3">
              <button onClick={() => setIsLibraryOpen(true)} className="bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 backdrop-blur-sm">
                📚 {t.libraryTitle}
              </button>
              <button onClick={() => setIsAlertPanelOpen(true)} className="bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 backdrop-blur-sm">
                🔔 {t.manageAlerts}
              </button>
            </div>
            <button onClick={toggleLang} className="bg-emerald-900/50 hover:bg-emerald-900 border border-emerald-400/30 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2">
              <span className="text-emerald-400">🌐</span> {t.langName}
            </button>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="space-y-4">
              <div className="inline-block bg-emerald-500/30 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border border-emerald-400/20">Portal Falahi DZ</div>
              <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight leading-tight">{t.title}</h1>
              <p className="text-emerald-100 text-xl max-w-2xl font-medium opacity-90">{t.subtitle}</p>
              <div className="pt-4">
                <span className="px-5 py-2 bg-amber-500 text-white rounded-2xl text-xs font-black shadow-lg shadow-amber-900/20">📍 {t[region]}</span>
              </div>
            </div>
            <div className="hidden lg:block w-32 h-32 bg-white/5 rounded-3xl rotate-12 flex items-center justify-center text-6xl shadow-inner border border-white/10">🇩🇿</div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 -mt-10">
        <section className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 mb-16 border border-stone-100 ring-1 ring-black/5 relative overflow-hidden">
          <div className={`flex flex-col lg:flex-row items-center gap-16 ${lang === 'en' || lang === 'fr' ? 'lg:flex-row-reverse' : ''}`}>
            <div className="w-full lg:w-5/12">
              <SeasonVisualizer activeSeason={activeSeason} onSeasonChange={setActiveSeason} lang={lang} />
            </div>
            <div className="w-full lg:w-7/12 space-y-8">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-3xl flex items-center justify-center text-4xl text-white shadow-xl transform transition-transform hover:rotate-6" style={{backgroundColor: SEASONAL_GUIDE[activeSeason].color}}>
                    {['🍂', '❄️', '🌸', '☀️'][activeSeason]}
                  </div>
                  <h2 className="text-4xl font-black text-stone-800 tracking-tight">{lang === 'ar' ? SEASONAL_GUIDE[activeSeason].season_ar : lang === 'en' ? SEASONAL_GUIDE[activeSeason].season_en : SEASONAL_GUIDE[activeSeason].season_fr}</h2>
               </div>
               <div className="grid sm:grid-cols-2 gap-6">
                 <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100">
                    <h3 className="font-black text-emerald-800 mb-4 flex items-center gap-2"><span>🚜</span> {t.fieldActivities}</h3>
                    <ul className="text-sm text-stone-600 space-y-2 font-medium">
                      {(lang === 'ar' ? SEASONAL_GUIDE[activeSeason].activities_ar : lang === 'en' ? SEASONAL_GUIDE[activeSeason].activities_en : SEASONAL_GUIDE[activeSeason].activities_fr).map((a, i) => <li key={i} className="flex gap-2"><span>•</span> {a}</li>)}
                    </ul>
                 </div>
                 <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
                    <h3 className="font-black text-amber-800 mb-4 flex items-center gap-2"><span>💡</span> {t.expertTips}</h3>
                    <p className="text-sm text-amber-700 font-medium leading-relaxed italic">
                      "{lang === 'ar' ? SEASONAL_GUIDE[activeSeason].tips_ar[0] : lang === 'en' ? SEASONAL_GUIDE[activeSeason].tips_en[0] : SEASONAL_GUIDE[activeSeason].tips_fr[0]}"
                    </p>
                 </div>
               </div>
            </div>
          </div>
        </section>

        <section className="mb-12 space-y-8">
          <div className="flex flex-col lg:flex-row gap-8 items-end justify-between bg-emerald-50/50 p-8 rounded-[2rem] border border-emerald-100 shadow-sm">
            <div className="w-full lg:w-5/12">
              <h2 className="text-2xl font-black text-stone-800 mb-6">{t.majorCrops}</h2>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full p-5 ${lang === 'ar' ? 'pr-14' : 'pl-14'} rounded-2xl border-none focus:ring-4 focus:ring-emerald-500/20 outline-none shadow-xl shadow-emerald-900/5 text-stone-700 font-bold transition-all`}
                />
                <span className={`absolute ${lang === 'ar' ? 'right-5' : 'left-5'} top-5 text-emerald-600 text-2xl`}>🔍</span>
              </div>
            </div>

            <div className="w-full lg:w-7/12 space-y-6">
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-xs font-black transition-all border-2 ${
                      selectedCategory === cat.id 
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xl shadow-emerald-900/20 -translate-y-1' 
                        : 'bg-white text-stone-600 border-stone-100 hover:border-emerald-300'
                    }`}
                  >
                    <span className="text-lg">{cat.icon}</span> {cat.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setUseSeasonalFilter(!useSeasonalFilter)} className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 flex items-center gap-3 ${useSeasonalFilter ? 'bg-emerald-100 text-emerald-800 border-emerald-200 shadow-sm' : 'bg-white text-stone-400 border-stone-100'}`}>
                  <span>{useSeasonalFilter ? '✅' : '⏳'}</span> {t.activeSeasonOnly}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCrops.length > 0 ? (
              filteredCrops.map(crop => (
                <CropCard key={crop.id} crop={crop} onSelect={setSelectedCrop} lang={lang} userRegion={region} />
              ))
            ) : (
              <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border-4 border-dashed border-stone-100">
                <div className="text-8xl mb-8 grayscale opacity-20">🚜</div>
                <h3 className="text-2xl font-black text-stone-300">{t.noResultsFound}</h3>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="mt-32 py-20 bg-stone-900 text-white text-center rounded-t-[4rem]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center gap-4 mb-10">
            <div className="w-12 h-1 bg-emerald-500 rounded-full"></div>
            <div className="text-4xl">🇩🇿</div>
            <div className="w-12 h-1 bg-emerald-500 rounded-full"></div>
          </div>
          <p className="text-stone-400 text-lg font-bold mb-10">{t.madeWith}</p>
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            <button onClick={() => setIsFeedbackOpen(true)} className="text-emerald-400 hover:text-white transition-colors font-black uppercase text-xs tracking-widest">✍️ {t.feedbackButton}</button>
            <button onClick={() => setIsLibraryOpen(true)} className="text-emerald-400 hover:text-white transition-colors font-black uppercase text-xs tracking-widest">📚 {t.libraryTitle}</button>
          </div>
          <p className="text-[10px] text-stone-500 font-black uppercase tracking-[0.5em] opacity-50">© {new Date().getFullYear()} Portal Falahi DZ • Version 2.0</p>
        </div>
      </footer>

      {selectedCrop && <CropDetailsModal crop={selectedCrop} onClose={() => setSelectedCrop(null)} lang={lang} />}
      {isAlertPanelOpen && <AlertManager lang={lang} region={region} setRegion={setRegion} reminders={reminders} onToggleReminder={toggleReminder} onClose={() => setIsAlertPanelOpen(false)} />}
      {isFeedbackOpen && <FeedbackModal lang={lang} onClose={() => setIsFeedbackOpen(false)} />}
      {isLibraryOpen && <LibraryModal lang={lang} onClose={() => setIsLibraryOpen(false)} />}
    </div>
  );
};

export default App;
