import React, { useState } from 'react';
import { Language } from './types';
import { UI_STRINGS } from './locales';

interface FeedbackModalProps {
  lang: Language;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ lang, onClose }) => {
  const t = UI_STRINGS[lang];
  const [type, setType] = useState('general');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col relative scale-up">
        <button 
          onClick={onClose}
          className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} text-stone-400 hover:text-stone-600 p-2 transition-all`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-2">
                ✍️
              </div>
              <h2 className="text-2xl font-bold text-stone-800">{t.feedbackTitle}</h2>
              <p className="text-stone-500 text-sm leading-relaxed">{t.feedbackSubtitle}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">
                  {t.feedbackType}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'inaccuracy', label: t.feedbackInaccuracy, icon: '📍' },
                    { id: 'new_crop', label: t.feedbackNewCrop, icon: '🌿' },
                    { id: 'general', label: t.feedbackGeneral, icon: '💬' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setType(opt.id)}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all text-[10px] font-bold ${
                        type === opt.id 
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800' 
                          : 'border-stone-100 hover:border-emerald-200 text-stone-500'
                      }`}
                    >
                      <span className="text-lg">{opt.icon}</span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <textarea
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={t.feedbackPlaceholder}
                  className="w-full h-32 p-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !comment.trim()}
              className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>🚀</span>
                  {t.sendFeedback}
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="p-12 text-center space-y-6 animate-fadeIn">
            <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center text-4xl mx-auto shadow-lg">
              ✅
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-stone-800">{t.feedbackSuccess}</h2>
            </div>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-stone-900 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-md"
            >
              {t.close}
            </button>
          </div>
        )}
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
      `}</style>
    </div>
  );
};

export default FeedbackModal;