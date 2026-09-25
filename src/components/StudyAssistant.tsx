import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  BookOpen,
  CornerDownLeft,
  Copy,
  Check
} from 'lucide-react';
import { ChatMessage, Subject } from '../types';
import { findEducationalResponse } from '../data/assistantResponses';

interface StudyAssistantProps {
  currentSubject: Subject;
  messages: ChatMessage[];
  onSendMessage: (userText: string, assistantResponse: string) => void;
  onClearChat: () => void;
}

export const StudyAssistant: React.FC<StudyAssistantProps> = ({
  currentSubject,
  messages,
  onSendMessage,
  onClearChat,
}) => {
  const [inputText, setInputText] = useState('');
  const [isResponding, setIsResponding] = useState(false);
  const [currentPromptSuggestions, setCurrentPromptSuggestions] = useState<string[]>([]);
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const defaultPrompts = [
    'Explain recursion simply',
    'Help me understand OOP',
    'Explain Python functions',
    'What is a C++ pointer?',
    'Explain HTML tags',
    'Explain databases',
    'How does data analytics work?',
    'Explain machine learning simply',
    'What is Generative AI?',
    'What is Agentic AI?',
    'What is AI & Robotics?',
    'Explain basic computer networking',
    'Explain cybersecurity basics',
    'Help me create a study plan',
    'Quiz me on Python',
    'Explain PivotTables in Excel',
  ];

  // Update suggestions based on selected subject
  useEffect(() => {
    if (currentSubject && currentSubject.suggestedPrompts && currentSubject.suggestedPrompts.length > 0) {
      setCurrentPromptSuggestions(currentSubject.suggestedPrompts);
    } else {
      setCurrentPromptSuggestions(defaultPrompts.slice(0, 4));
    }
  }, [currentSubject]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isResponding]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isResponding) return;

    setInputText('');
    setIsResponding(true);

    // Get predefined educational response
    const topicResult = findEducationalResponse(text, currentSubject.name);

    // Simulate short, non-blocking typing indicator (450ms)
    setTimeout(() => {
      onSendMessage(text, topicResult.response);
      setIsResponding(false);

      if (topicResult.followUps && topicResult.followUps.length > 0) {
        setCurrentPromptSuggestions(topicResult.followUps);
      }
    }, 450);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIdx(idx);
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  return (
    <div id="ai-chat-view" className="space-y-4 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-5 sm:p-6 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#112D4E] via-[#3F72AF] to-[#558bc9] text-white flex items-center justify-center shadow-xs shrink-0">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-base sm:text-lg font-bold text-[#112D4E] dark:text-white tracking-tight">
                  Study Buddy Academy Assistant
                </h2>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#16A34A] dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 flex items-center gap-1.5 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
                  {isResponding ? 'Drafting...' : 'Ready'}
                </span>
              </div>
              <p className="text-xs text-[#112D4E]/70 dark:text-[#DBE2EF]/80 mt-0.5">
                Curriculum assistant • Instant explanations and study guidance
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#DBE2EF]/60 text-[#3F72AF] dark:bg-[#1c3e66] dark:text-[#DBE2EF] text-xs font-semibold border border-[#DBE2EF] dark:border-[#244b7a] shadow-2xs">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Subject: {currentSubject.name}</span>
            </div>
            <button
              type="button"
              onClick={onClearChat}
              title="Clear chat history"
              aria-label="Clear chat history"
              className="p-2 rounded-xl text-[#112D4E]/60 hover:text-rose-600 hover:bg-rose-50 dark:text-[#DBE2EF]/70 dark:hover:text-rose-400 dark:hover:bg-[#1c3e66] transition-colors border border-transparent hover:border-rose-200 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Container with Responsive Viewport Height */}
      <div className="bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] shadow-xs flex flex-col h-[480px] sm:h-[540px] md:h-[600px] transition-colors">
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#F9F7F7]/60 dark:bg-[#0b1a2e]/60">
          {messages.map((msg, msgIdx) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 text-xs font-semibold shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-[#3F72AF] text-white shadow-xs'
                    : 'bg-[#DBE2EF]/70 text-[#3F72AF] dark:bg-[#1c3e66] dark:text-[#DBE2EF] border border-[#DBE2EF] dark:border-[#244b7a]'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-[#3F72AF] text-white rounded-tr-xs'
                    : 'bg-white dark:bg-[#0e243e] text-[#112D4E] dark:text-[#F9F7F7] rounded-tl-xs border border-[#DBE2EF] dark:border-[#1c3e66]'
                }`}
              >
                {/* Parse Markdown-like text simply */}
                <div className="whitespace-pre-wrap font-sans break-words space-y-2">
                  {msg.text.split('\n\n').map((paragraph, pIdx) => {
                    // Check for code blocks
                    if (paragraph.includes('```')) {
                      const parts = paragraph.split('```');
                      return (
                        <div key={pIdx} className="space-y-1.5 my-2">
                          {parts.map((part, partIdx) => {
                            if (partIdx % 2 === 1) {
                              // code block
                              const lines = part.split('\n');
                              const lang = lines[0]?.trim();
                              const code = lines.slice(1).join('\n');
                              const codeKey = msgIdx * 100 + partIdx;
                              return (
                                <div
                                  key={partIdx}
                                  className="rounded-xl bg-[#0b1a2e] text-[#DBE2EF] p-3.5 my-2 font-mono text-xs overflow-x-auto border border-[#1c3e66] shadow-inner group/code relative"
                                >
                                  <div className="text-[10px] text-[#DBE2EF]/70 uppercase font-semibold mb-2 border-b border-[#1c3e66] pb-1.5 flex items-center justify-between">
                                    <span className="text-[#3F72AF]">{lang || 'code'}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleCopyCode(code || part, codeKey)}
                                      className="flex items-center gap-1 text-[10px] text-[#DBE2EF]/70 hover:text-white px-1.5 py-0.5 rounded hover:bg-[#1c3e66] transition-colors"
                                    >
                                      {copiedCodeIdx === codeKey ? (
                                        <>
                                          <Check className="w-3 h-3 text-emerald-400" />
                                          <span className="text-emerald-400">Copied</span>
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="w-3 h-3" />
                                          <span>Copy</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                  <code className="text-emerald-300 block">{code || part}</code>
                                </div>
                              );
                            }
                            return <p key={partIdx}>{part}</p>;
                          })}
                        </div>
                      );
                    }
                    return <p key={pIdx}>{paragraph}</p>;
                  })}
                </div>

                <div
                  className={`text-[10px] mt-2.5 text-right font-medium tabular-nums ${
                    msg.sender === 'user'
                      ? 'text-[#DBE2EF]'
                      : 'text-[#112D4E]/60 dark:text-[#DBE2EF]/60'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {/* Typing / Thinking Indicator */}
          {isResponding && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#DBE2EF]/70 text-[#3F72AF] dark:bg-[#1c3e66] dark:text-[#DBE2EF] flex items-center justify-center shrink-0 border border-[#DBE2EF] dark:border-[#244b7a]">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white dark:bg-[#0e243e] rounded-2xl rounded-tl-xs px-4 py-3 border border-[#DBE2EF] dark:border-[#1c3e66] text-xs text-[#112D4E]/70 dark:text-[#DBE2EF]/80 flex items-center gap-2 shadow-xs">
                <span>Assistant is drafting explanation</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3F72AF] dark:bg-[#558bc9] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3F72AF] dark:bg-[#558bc9] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3F72AF] dark:bg-[#558bc9] animate-bounce [animation-delay:0.4s]" />
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Shelf (Surface background #DBE2EF) */}
        <div className="px-4 py-2.5 bg-[#DBE2EF]/40 dark:bg-[#0e243e]/80 border-t border-[#DBE2EF] dark:border-[#1c3e66]">
          <div className="flex items-center gap-1.5 text-xs text-[#112D4E]/80 dark:text-[#DBE2EF]/90 mb-2 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#3F72AF] dark:text-[#558bc9]" />
            <span>Suggested prompts:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {currentPromptSuggestions.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(prompt)}
                disabled={isResponding}
                className="px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap bg-white dark:bg-[#112D4E] border border-[#DBE2EF] dark:border-[#1c3e66] text-[#112D4E] dark:text-[#DBE2EF] hover:border-[#3F72AF] hover:text-[#3F72AF] dark:hover:text-white active:scale-[0.97] transition-all shrink-0 disabled:opacity-50 shadow-2xs cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3.5 sm:p-4 border-t border-[#DBE2EF] dark:border-[#1c3e66] bg-white dark:bg-[#112D4E] rounded-b-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-end gap-2.5"
          >
            <div className="flex-1 relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Ask about ${currentSubject.name}, algorithms, pointers, machine learning, networking...`}
                rows={1}
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-[#DBE2EF] dark:border-[#1c3e66] bg-[#F9F7F7] dark:bg-[#0e243e] text-[#112D4E] dark:text-white placeholder:text-[#112D4E]/40 dark:placeholder:text-[#DBE2EF]/50 focus:outline-none focus:ring-2 focus:ring-[#3F72AF] focus:bg-white dark:focus:bg-[#0e243e] resize-none transition-all shadow-2xs"
              />
            </div>
            <button
              type="submit"
              id="btn-send-chat-msg"
              disabled={!inputText.trim() || isResponding}
              className="p-3 sm:px-5 sm:py-3 rounded-xl bg-[#3F72AF] hover:bg-[#315d91] active:bg-[#294b75] active:scale-[0.97] text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs shrink-0 focus:outline-none focus:ring-2 focus:ring-[#3F72AF]/50 cursor-pointer min-h-[44px]"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
          <div className="flex items-center justify-between text-[11px] text-[#112D4E]/60 dark:text-[#DBE2EF]/60 mt-2 px-1">
            <span className="flex items-center gap-1">
              <CornerDownLeft className="w-3 h-3 text-[#112D4E]/40 dark:text-[#DBE2EF]/40" />
              <span>Press Enter to send</span>
            </span>
            <span>Study Buddy Educational Assistant</span>
          </div>
        </div>
      </div>
    </div>
  );
};
