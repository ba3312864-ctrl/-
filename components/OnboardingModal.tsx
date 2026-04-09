
import React, { useState } from 'react';
import { Language } from '../types';
import { UI_STRINGS } from '../locales';

interface OnboardingModalProps {
  lang: Language;
  onComplete: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ lang, onComplete }) => {
  const [step, setStep] = useState(0);
  const t = UI_STRINGS[lang];

  const steps = [
    {
      title: t.welcomeStep1Title,
      desc: t.welcomeStep1Desc,
      icon: '🎡',
      color: 'bg-amber-500'
    },
    {
      title: t.welcomeStep2Title,
      desc: t.welcomeStep2Desc,
      icon: '📚',
      color: 'bg-emerald-500'
    },
    {
      title: t.welcomeStep3Title,
      desc: t.welcomeStep3Desc,
      icon: '🔔',
      color: 'bg-blue-500'
    }
  ];

  const currentStep = steps[step];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-emerald-950/90 backdrop-blur-md">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scaleUp">
        <div className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className={`w-24 h-24 ${currentStep.color} rounded-full flex items-center justify-center text-5xl shadow-lg animate-bounce`}>
              {currentStep.icon}
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-stone-800">{currentStep.title}</h2>
            <p className="text-stone-500 leading-relaxed">{currentStep.desc}</p>
          </div>

          <div className="flex justify-center gap-2">
            {steps.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 rounded-full transition-all duration-300 ${idx === step ? 'w-8 bg-emerald-600' : 'w-2 bg-stone-200'}`}
              />
            ))}
          </div>
        </div>

        <div className="p-6 bg-stone-50 border-t border-stone-100 flex justify-between items-center">
          <button 
            onClick={onComplete}
            className="text-stone-400 font-bold hover:text-stone-600 px-4"
          >
            {t.skip}
          </button>
          
          <button 
            onClick={() => step < steps.length - 1 ? setStep(s => s + 1) : onComplete()}
            className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-md active:scale-95"
          >
            {step === steps.length - 1 ? t.startExploring : t.next}
          </button>
        </div>
      </div>
      <style>{`
        @keyframes scaleUp {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scaleUp {
          animation: scaleUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
};

export default OnboardingModal;
