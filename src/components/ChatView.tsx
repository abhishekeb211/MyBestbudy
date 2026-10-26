import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, StudentProfile } from '../types';

interface ChatViewProps {
  initialPrompt?: string;
  profile: StudentProfile;
  onOpenCrisis: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ initialPrompt, profile, onOpenCrisis }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'buddy',
      text: `Hello ${profile.name || 'there'}. I'm your Best Buddy at PCCOE. This is a confidential, safe space with zero judgment. Whether you're stressed about upcoming submissions, feeling overwhelmed by placements, or just need to unpack your thoughts—I'm right here with you. How is your heart and mind feeling today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of conversation
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle incoming initial prompt if redirected from Prompt Result View
  useEffect(() => {
    if (initialPrompt) {
      sendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          conversationHistory: messages.slice(-8),
          studentContext: {
            name: profile.name,
            department: profile.department,
            year: profile.year,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Network error');
      }

      const data = await response.json();
      const buddyReply: ChatMessage = {
        id: `reply-${Date.now()}`,
        sender: 'buddy',
        text: data.reply || "I hear you. Take a slow, gentle breath. What's one small thing we can look at together?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, buddyReply]);
    } catch {
      // Graceful offline fallback
      const fallbackReply: ChatMessage = {
        id: `reply-err-${Date.now()}`,
        sender: 'buddy',
        text: "I'm right here with you. Even when technology has a hiccup, remember: take a slow 4-second breath in and a 6-second breath out. What's the main thought occupying your mind right now?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  const quickPrompts = [
    'Help me reframe my fear of failing upcoming exams',
    'Placement season is making me feel like an imposter',
    'Give me a 5-minute study reset technique',
    'I cannot sleep because my mind is constantly racing',
  ];

  return (
    <div className="w-full px-4 py-3 h-[calc(100vh-125px)] flex flex-col animate-fade-in pb-20">
      {/* Chat Top Banner */}
      <div className="bg-white border border-[#bec8cb]/40 rounded-2xl p-4 mb-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#cbead6] text-[#006474] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">psychology</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-headline font-bold text-base text-[#191c1c]">Best Buddy AI Companion</h2>
              <span className="text-[10px] font-semibold bg-[#2d7d8e]/15 text-[#006474] px-2 py-0.5 rounded-full">
                Confidential & CBT-Guided
              </span>
            </div>
            <p className="text-xs text-[#3f484b]">Non-diagnostic support for PCCOE engineering students</p>
          </div>
        </div>

        <button
          onClick={onOpenCrisis}
          className="text-xs font-semibold text-[#ba1a1a] hover:bg-[#ffdad6]/40 px-3 py-1.5 rounded-full transition-colors hidden sm:flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px] fill-1">emergency</span>
          <span>Crisis Support</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 sm:pr-2">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-[#006474] text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1 shadow-xs">
                  <span className="material-symbols-outlined text-[18px]">spa</span>
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-[#006474] text-white rounded-tr-none shadow-xs'
                    : 'bg-white text-[#191c1c] border border-[#bec8cb]/40 rounded-tl-none shadow-xs whitespace-pre-wrap'
                }`}
              >
                <div>{msg.text}</div>
                <div
                  className={`text-[10px] mt-1.5 text-right ${
                    isUser ? 'text-white/70' : 'text-[#6f797c]'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-full bg-[#496455] text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1 shadow-xs">
                  {profile.name ? profile.name[0].toUpperCase() : 'U'}
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-2.5 justify-start animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-[#006474] text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1">
              <span className="material-symbols-outlined text-[18px]">spa</span>
            </div>
            <div className="bg-white border border-[#bec8cb]/40 rounded-2xl rounded-tl-none px-4 py-3 shadow-xs flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#006474] animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-[#006474] animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-[#006474] animate-bounce [animation-delay:0.4s]" />
              <span className="text-xs text-[#6f797c] ml-2">Best Buddy is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      {messages.length <= 3 && (
        <div className="py-2 overflow-x-auto hide-scrollbar flex items-center gap-1.5">
          {quickPrompts.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="shrink-0 text-[11px] sm:text-xs bg-white hover:bg-[#cbead6]/50 text-[#006474] border border-[#bec8cb]/40 px-3 py-1.5 rounded-full transition-colors active:scale-95 whitespace-nowrap"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input Box */}
      <div className="pt-2">
        <div className="bg-white border border-[#bec8cb]/60 focus-within:border-[#006474] focus-within:ring-2 focus-within:ring-[#2d7d8e]/20 rounded-2xl p-2 sm:p-3 shadow-xs transition-all flex items-end gap-2">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            placeholder="Talk with Best Buddy... (Press Enter to send)"
            className="flex-1 bg-transparent border-none text-xs sm:text-sm text-[#191c1c] placeholder:text-[#6f797c] outline-none resize-none px-2 py-1 max-h-32"
          />

          <button
            onClick={() => sendMessage(inputText)}
            disabled={!inputText.trim() || isLoading}
            className="w-10 h-10 rounded-full bg-[#006474] hover:bg-[#004e5b] disabled:opacity-40 text-white flex items-center justify-center shrink-0 shadow-xs active:scale-95 transition-all cursor-pointer"
            aria-label="Send message"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#6f797c] px-2 pt-1.5">
          <span>Non-diagnostic emotional support · Completely private</span>
          <button
            onClick={onOpenCrisis}
            className="text-[#ba1a1a] hover:underline font-medium"
          >
            Need urgent help?
          </button>
        </div>
      </div>
    </div>
  );
};
