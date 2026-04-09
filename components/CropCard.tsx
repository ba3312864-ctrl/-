
import React from 'react';
import { CropInfo, Language, UserRegion } from '../types';
import { UI_STRINGS } from '../locales';

interface CropCardProps {
  crop: CropInfo;
  onSelect: (crop: CropInfo) => void;
  lang: Language;
  userRegion: UserRegion;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800';

const CropCard: React.FC<CropCardProps> = ({ crop, onSelect, lang, userRegion }) => {
  const t = UI_STRINGS[lang];
  const name = lang === 'ar' ? crop.name_ar : lang === 'en' ? crop.name_en : crop.name_fr;
  const regions = lang === 'ar' ? crop.regions_ar : lang === 'en' ? crop.regions_en : crop.regions_fr;
  
  const getPlantingDate = () => {
    if (crop.regionalPlanting && crop.regionalPlanting[userRegion]) {
      const data = crop.regionalPlanting[userRegion];
      return lang === 'ar' ? data.ar : lang === 'en' ? data.en : data.fr;
    }
    return lang === 'ar' ? crop.planting_ar : lang === 'en' ? crop.planting_en : crop.planting_fr;
  };

  const getHarvestDate = () => {
    if (crop.regionalHarvest && crop.regionalHarvest[userRegion]) {
      const data = crop.regionalHarvest[userRegion];
      return lang === 'ar' ? data.ar : lang === 'en' ? data.en : data.fr;
    }
    return lang === 'ar' ? crop.harvest_ar : lang === 'en' ? crop.harvest_en : crop.harvest_fr;
  };

  const desc = lang === 'ar' ? crop.desc_ar : lang === 'en' ? crop.desc_en : crop.desc_fr;

  return (
    <div 
      onClick={() => onSelect(crop)}
      className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer group flex flex-col h-full"
    >
      <div className="h-32 bg-emerald-900 relative overflow-hidden flex-shrink-0">
        <img 
          src={crop.imageUrl || FALLBACK_IMAGE} 
          alt={name} 
          className={`w-full h-full object-cover transition-opacity duration-500 ${crop.imageUrl ? 'opacity-60 group-hover:opacity-80' : 'opacity-40 grayscale group-hover:grayscale-0'}`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/40 to-transparent"></div>
        <span className={`absolute bottom-3 ${lang === 'ar' ? 'right-4' : 'left-4'} text-4xl drop-shadow-lg transform group-hover:scale-110 transition-transform`}>
          {crop.icon}
        </span>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-xl font-bold text-emerald-900 line-clamp-1">{name}</h3>
        </div>
        <p className="text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-4">{regions.join(' • ')}</p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex flex-col p-2 bg-emerald-50 rounded-xl border border-emerald-100/50">
            <span className="text-[9px] text-emerald-700 font-bold uppercase flex items-center gap-1">
              {t.planting} 
              <span className="opacity-60 text-[8px]">({t[userRegion]})</span>
            </span>
            <span className="text-[11px] text-stone-700 font-bold truncate">{getPlantingDate()}</span>
          </div>
          <div className="flex flex-col p-2 bg-amber-50 rounded-xl border border-amber-100/50">
            <span className="text-[9px] text-amber-700 font-bold uppercase flex items-center gap-1">
              {t.harvest}
              <span className="opacity-60 text-[8px]">({t[userRegion]})</span>
            </span>
            <span className="text-[11px] text-stone-700 font-bold truncate">{getHarvestDate()}</span>
          </div>
        </div>

        <p className="text-xs text-stone-600 leading-relaxed line-clamp-2 mb-4">
          {desc}
        </p>
        
        <div className={`mt-auto pt-3 border-t border-stone-100 flex items-center gap-2 ${lang === 'ar' ? 'justify-end' : 'justify-start'}`}>
          <span className="text-emerald-600 text-xs font-bold group-hover:translate-x-1 transition-transform inline-block">
            {t.viewDetails}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CropCard;
