import React from 'react';
import { SEASONAL_GUIDE, MONTHS_AR, MONTHS_EN } from './constants';
import { Language } from './types';

interface SeasonVisualizerProps {
  activeSeason: number;
  onSeasonChange: (index: number) => void;
  lang: Language;
}

const SeasonVisualizer: React.FC<SeasonVisualizerProps> = ({ activeSeason, onSeasonChange, lang }) => {
  const radius = 120;
  const innerRadius = 70;
  const centerX = 150;
  const centerY = 150;
  const months = lang === 'ar' ? MONTHS_AR : MONTHS_EN;
  const currentSeason = SEASONAL_GUIDE[activeSeason];

  const getCoordinates = (index: number, r: number) => {
    // Start from top (12 o'clock) which is -90 degrees
    const angle = (index * 30 - 90) * (Math.PI / 180);
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle)
    };
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[300px] h-[300px]">
        <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-xl transform transition-transform duration-700">
          {/* Background circle */}
          <circle cx={centerX} cy={centerY} r={radius + 10} fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1" />
          
          {/* Seasonal Segments */}
          {SEASONAL_GUIDE.map((season, idx) => {
            const startOuter = getCoordinates(season.startMonth, radius);
            const endOuter = getCoordinates(season.endMonth + 1, radius);
            const startInner = getCoordinates(season.startMonth, innerRadius);
            const endInner = getCoordinates(season.endMonth + 1, innerRadius);

            const startAngle = (season.startMonth * 30 - 90);
            let endAngle = (season.endMonth * 30 - 90 + 30);
            if (endAngle < startAngle) endAngle += 360; 
            const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

            const isActive = activeSeason === idx;

            return (
              <path
                key={idx}
                d={`
                  M ${startOuter.x} ${startOuter.y}
                  A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y}
                  L ${endInner.x} ${endInner.y}
                  A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${startInner.x} ${startInner.y}
                  Z
                `}
                fill={season.color}
                className={`cursor-pointer transition-all duration-300 ${isActive ? 'opacity-100 scale-105 filter saturate-150' : 'opacity-30 hover:opacity-60'}`}
                style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
                onClick={() => onSeasonChange(idx)}
              />
            );
          })}

          {/* Month Names */}
          {months.map((month, idx) => {
            const pos = getCoordinates(idx + 0.5, radius + 25);
            return (
              <text
                key={idx}
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                alignmentBaseline="middle"
                className="text-[9px] font-bold fill-stone-400 select-none"
              >
                {month}
              </text>
            );
          })}

          {/* Center Information */}
          <circle cx={centerX} cy={centerY} r={innerRadius - 5} fill="white" className="shadow-inner" />
          <text
            x={centerX}
            y={centerY - 8}
            textAnchor="middle"
            className="text-lg font-bold fill-stone-800"
          >
            {lang === 'ar' ? currentSeason.season_ar : lang === 'en' ? currentSeason.season_en : currentSeason.season_fr}
          </text>
          <text
            x={centerX}
            y={centerY + 18}
            textAnchor="middle"
            className="text-[10px] fill-stone-500 font-medium"
          >
            {lang === 'ar' ? currentSeason.range_ar : lang === 'en' ? currentSeason.range_en : currentSeason.range_fr}
          </text>
        </svg>
      </div>
    </div>
  );
};

export default SeasonVisualizer;