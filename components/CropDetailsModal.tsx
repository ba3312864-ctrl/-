
import React from 'react';
import { CropInfo, Language } from '../types';
import { UI_STRINGS } from '../locales';

interface CropDetailsModalProps {
  crop: CropInfo;
  onClose: () => void;
  lang: Language;
}

const FALLBACK_HERO = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200';

const CropDetailsModal: React.FC<CropDetailsModalProps> = ({ crop, onClose, lang }) => {
  const t = UI_STRINGS[lang];
  const name = lang === 'ar' ? crop.name_ar : crop.name_en;
  const regions = lang === 'ar' ? crop.regions_ar : crop.regions_en;
  const extDesc = lang === 'ar' ? crop.ext_desc_ar : crop.ext_desc_en;
  const desc = lang === 'ar' ? crop.desc_ar : crop.desc_en;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col relative scale-up">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} z-20 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-md transition-all active:scale-90`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Hero Section */}
        <div className="h-64 sm:h-80 relative flex-shrink-0 bg-emerald-950">
          <img 
            src={crop.imageUrl || FALLBACK_HERO} 
            className={`w-full h-full object-cover transition-opacity duration-700 ${crop.imageUrl ? 'opacity-100' : 'opacity-40 grayscale'}`}
            alt={name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_HERO;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
          <div className={`absolute bottom-6 ${lang === 'ar' ? 'right-6' : 'left-6'} text-white`}>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-5xl shadow-xl">
                {crop.icon}
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{name}</h2>
                <p className="text-emerald-200 text-sm sm:text-lg font-medium opacity-90">{regions.join(' • ')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-12 bg-white">
          {/* General Description */}
          <section className="animate-slideIn">
            <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
              <span className="text-emerald-600 bg-emerald-50 p-1.5 rounded-lg">📖</span>
              {t.aboutCrop}
            </h3>
            <p className="text-stone-600 leading-relaxed text-lg">
              {extDesc || desc}
            </p>
          </section>

          {/* Regional Agricultural Calendar */}
          <section className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 animate-slideIn">
             <h3 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">📅</span>
                {lang === 'ar' ? 'الرزنامة الزراعية حسب المنطقة' : 'Regional Agricultural Calendar'}
             </h3>
             <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { key: 'north', icon: '🌊', label: t.north, color: 'emerald' },
                  { key: 'highlands', icon: '🏔️', label: t.highlands, color: 'sky' },
                  { key: 'sahara', icon: '🌴', label: t.sahara, color: 'amber' }
                ].map((reg) => (
                  <div key={reg.key} className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center">
                    <span className="text-3xl mb-3 p-3 bg-stone-50 rounded-full shadow-inner">{reg.icon}</span>
                    <span className="text-xs font-bold text-stone-400 uppercase mb-4 tracking-widest">{reg.label}</span>
                    
                    <div className="w-full space-y-3">
                      <div className="flex flex-col items-center p-2 bg-emerald-50/50 rounded-xl border border-emerald-100">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase mb-1">{t.planting}</span>
                        <span className="text-xs font-bold text-stone-800">
                          {crop.regionalPlanting 
                            ? (lang === 'ar' ? crop.regionalPlanting[reg.key as 'north'|'highlands'|'sahara'].ar : crop.regionalPlanting[reg.key as 'north'|'highlands'|'sahara'].en)
                            : (lang === 'ar' ? crop.planting_ar : crop.planting_en)
                          }
                        </span>
                      </div>
                      
                      <div className="flex flex-col items-center p-2 bg-amber-50/50 rounded-xl border border-amber-100">
                        <span className="text-[10px] font-bold text-amber-600 uppercase mb-1">{t.harvest}</span>
                        <span className="text-xs font-bold text-stone-800">
                          {crop.regionalHarvest 
                            ? (lang === 'ar' ? crop.regionalHarvest[reg.key as 'north'|'highlands'|'sahara'].ar : crop.regionalHarvest[reg.key as 'north'|'highlands'|'sahara'].en)
                            : (lang === 'ar' ? crop.harvest_ar : crop.harvest_en)
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
             <p className="mt-6 text-center text-xs text-stone-400 italic">
               {t.disclaimerText}
             </p>
          </section>

          {/* Growth Stages Timeline */}
          {crop.growthStages && crop.growthStages.length > 0 && (
            <section className="animate-slideIn">
              <h3 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
                <span className="text-emerald-600 bg-emerald-50 p-1.5 rounded-lg">📈</span>
                {t.growthStagesTitle}
              </h3>
              <div className="relative">
                <div className={`absolute ${lang === 'ar' ? 'right-6' : 'left-6'} top-0 bottom-0 w-0.5 bg-emerald-100 hidden sm:block`}></div>
                
                <div className="space-y-6 relative">
                  {crop.growthStages.map((stage, idx) => (
                    <div key={idx} className="flex items-start gap-6 relative">
                      <div className="z-10 w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl shadow-lg flex-shrink-0 transition-transform hover:scale-110">
                        {stage.icon}
                      </div>
                      
                      <div className="flex-1 bg-stone-50/50 p-5 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all hover:border-emerald-200">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                          <h4 className="font-bold text-stone-800 text-lg">
                            {lang === 'ar' ? stage.name_ar : stage.name_en}
                          </h4>
                          <span className="px-3 py-1 bg-white text-emerald-700 text-[10px] font-extrabold rounded-full border border-emerald-100 shadow-sm uppercase tracking-tight">
                            {t.duration} {lang === 'ar' ? stage.duration_ar : stage.duration_en}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-emerald-500">✨</span>
                          <p className="text-stone-600 text-sm leading-relaxed">
                            <span className="font-bold text-stone-700 mr-1">{t.carePoints}</span>
                            {lang === 'ar' ? stage.care_ar : stage.care_en}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Nutrient Deficiency Section */}
          {crop.nutrients && crop.nutrients.length > 0 && (
            <section className="bg-stone-50 p-6 sm:p-8 rounded-3xl border border-stone-200 animate-slideIn">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl bg-white p-2 rounded-2xl shadow-sm">🔬</span>
                <h3 className="text-xl font-bold text-stone-800">{t.nutrientDeficiency}</h3>
              </div>
              <div className="grid gap-4">
                {crop.nutrients.map((n, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 flex flex-col md:flex-row gap-4 transition-all hover:border-red-100">
                    <div className="md:w-1/3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <span className="text-red-700 text-xs font-bold uppercase tracking-widest">
                           {lang === 'ar' ? n.element_ar : n.element_en}
                        </span>
                      </div>
                      <h4 className="font-bold text-stone-800 mb-1">{t.symptoms}</h4>
                      <p className="text-stone-600 text-sm leading-relaxed">{lang === 'ar' ? n.symptom_ar : n.symptom_en}</p>
                    </div>
                    <div className={`md:w-2/3 md:${lang === 'ar' ? 'border-r pr-6' : 'border-l pl-6'} md:border-stone-100 flex items-center bg-emerald-50/30 p-4 rounded-xl`}>
                      <div className="flex gap-3">
                        <span className="text-xl">💡</span>
                        <div>
                          <h4 className="font-bold text-emerald-800 text-xs mb-1 uppercase tracking-wider">{t.solution}</h4>
                          <p className="text-emerald-700 text-sm font-medium">{lang === 'ar' ? n.solution_ar : n.solution_en}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        {/* Footer */}
        <div className={`p-6 border-t border-stone-100 bg-white flex ${lang === 'ar' ? 'justify-end' : 'justify-start'}`}>
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-stone-900 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg active:scale-95"
          >
            {t.close}
          </button>
        </div>
      </div>
      <style>{`
        .scale-up {
          animation: scaleUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes scaleUp {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CropDetailsModal;
