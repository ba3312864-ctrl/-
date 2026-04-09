
import React, { useState } from 'react';
import { Language } from '../types';
import { UI_STRINGS } from '../locales';
import { AGRI_LIBRARY } from '../constants';

interface LibraryModalProps {
  lang: Language;
  onClose: () => void;
}

const LibraryModal: React.FC<LibraryModalProps> = ({ lang, onClose }) => {
  const t = UI_STRINGS[lang];
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = Array.from(new Set(AGRI_LIBRARY.map(item => 
    lang === 'ar' ? item.category_ar : lang === 'en' ? item.category_en : item.category_fr
  )));
  
  const filteredArticles = activeCategory === 'all' 
    ? AGRI_LIBRARY 
    : AGRI_LIBRARY.filter(item => {
        const cat = lang === 'ar' ? item.category_ar : lang === 'en' ? item.category_en : item.category_fr;
        return cat === activeCategory;
      });

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-emerald-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white w-full max-w-5xl h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col relative scale-up">
        {/* Header */}
        <div className="p-6 md:p-8 bg-emerald-800 text-white relative overflow-hidden flex-shrink-0">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-700/50 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-1">{t.libraryTitle}</h2>
              <p className="text-emerald-100/80 text-xs md:text-sm max-w-md">{t.librarySubtitle}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="bg-stone-50 p-3 md:p-4 border-b border-stone-100 flex gap-2 overflow-x-auto scrollbar-hide flex-shrink-0">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2 rounded-full text-[10px] md:text-xs font-bold transition-all whitespace-nowrap ${
              activeCategory === 'all' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white text-stone-500 border border-stone-200 hover:border-emerald-300'
            }`}
          >
            {lang === 'ar' ? 'الكل' : lang === 'en' ? 'All' : 'Tout'}
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-[10px] md:text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory === cat ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white text-stone-500 border border-stone-200 hover:border-emerald-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-stone-50/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredArticles.map(article => (
              <div 
                key={article.id} 
                className="bg-white p-5 md:p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all flex flex-col gap-4 group hover:border-emerald-100"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                    {article.icon}
                  </div>
                  <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-md">
                    {lang === 'ar' ? article.category_ar : lang === 'en' ? article.category_en : article.category_fr}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-base md:text-lg font-bold text-stone-800 leading-snug">
                    {lang === 'ar' ? article.title_ar : lang === 'en' ? article.title_en : article.title_fr}
                  </h3>
                  <p className="text-xs md:text-sm text-stone-500 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all">
                    {lang === 'ar' ? article.content_ar : lang === 'en' ? article.content_en : article.content_fr}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-100 text-center bg-white flex-shrink-0">
          <p className="text-[9px] md:text-[10px] text-stone-400 font-medium">© {new Date().getFullYear()} Portal Falahi DZ - Bibliothèque Agricole</p>
        </div>
      </div>
    </div>
  );
};

export default LibraryModal;
