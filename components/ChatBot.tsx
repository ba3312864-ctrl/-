
import React, { useState, useRef, useEffect } from 'react';
import { Language, Message } from '../types';
import { UI_STRINGS } from '../locales';
import { chatWithGemini } from '../services/geminiService';

interface ChatBotProps {
  lang: Language;
}

const ChatBot: React.FC<ChatBotProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = UI_STRINGS[lang] as any;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithGemini(input, messages, lang);
      const aiMsg: Message = { role: 'model', text: response };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = { 
        role: 'model', 
        text: lang === 'ar' ? "عذراً، حدث خطأ. يرجى المحاولة لاحقاً." : "An error occurred. Please try again later." 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-6 ${lang === 'ar' ? 'left-6' : 'right-6'} z-[100]`}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center text-3xl hover:bg-emerald-700 transition-all hover:scale-110 active:scale-95"
        >
          🤖
        </button>
      ) : (
        <div className="bg-white w-[90vw] max-w-[400px] h-[65vh] rounded-[2.5rem] shadow-2xl border border-stone-200 overflow-hidden flex flex-col animate-scaleUp">
          <div className="p-5 bg-emerald-800 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌾</span>
              <h3 className="font-bold text-sm">{t.chatTitle || "AI Advisor"}</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-emerald-700 p-2 rounded-xl transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
            {messages.length === 0 && (
              <div className="text-center py-10 text-stone-400 italic text-sm">
                {t.chatWelcome || "Hello! Ask me any agricultural question."}
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-white text-stone-700 shadow-sm border border-stone-100 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-stone-100 rounded-tl-none">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-stone-100 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t.chatPlaceholder || "Ask a question..."}
                className={`flex-1 p-3 bg-stone-50 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-emerald-500/10 border border-stone-100 ${lang === 'ar' ? 'text-right' : 'text-left'}`}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-3 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center shadow-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes scaleUp {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scaleUp {
          animation: scaleUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
};

export default ChatBot;
