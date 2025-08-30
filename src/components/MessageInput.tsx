import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Mic, Paperclip, Sparkles } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  messages: any[];
}

export default function MessageInput({ onSendMessage, isLoading, messages }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const suggestions = [
    "Explain quantum computing in simple terms",
    "Write a Python function to sort a list",
    "Help me debug this JavaScript code",
    "Create a React component for a todo list",
    "What are the best practices for API design?",
    "Explain machine learning concepts"
  ];

  return (
    <div className="relative z-10 border-t border-gray-700/50 bg-gray-900/90 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto p-6">
        {/* Smart suggestions */}
        {!isLoading && messages.length <= 1 && (
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-gray-300">Try asking about:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {suggestions.slice(0, 4).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(suggestion)}
                  className="group px-4 py-2.5 text-sm bg-gray-800/60 hover:bg-gray-700/80 text-gray-300 hover:text-white rounded-2xl border border-gray-600/40 hover:border-gray-500/60 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  <span className="relative z-10">{suggestion}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-end space-x-4">
            {/* Enhanced action buttons */}
            <div className="flex space-x-2">
              <button
                type="button"
                className="group w-12 h-12 bg-gray-800/60 hover:bg-gray-700/80 text-gray-400 hover:text-gray-200 rounded-2xl transition-all duration-300 flex items-center justify-center border border-gray-600/40 hover:border-gray-500/60 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                <Paperclip className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
              </button>
              <button
                type="button"
                className="group w-12 h-12 bg-gray-800/60 hover:bg-gray-700/80 text-gray-400 hover:text-gray-200 rounded-2xl transition-all duration-300 flex items-center justify-center border border-gray-600/40 hover:border-gray-500/60 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                <Mic className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              </button>
            </div>
            
            <div className="flex-1 relative group">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything... (Enter to send, Shift+Enter for new line)"
                disabled={isLoading}
                className="w-full resize-none rounded-2xl border border-gray-600/50 px-6 py-4 pr-16 bg-gray-800/60 text-gray-100 placeholder-gray-400 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-300 min-h-[60px] max-h-40 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm shadow-xl group-hover:shadow-2xl font-medium tracking-wide"
                rows={1}
              />
              {/* Enhanced input glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl"></div>
              
              {/* Character counter */}
              {message.length > 0 && (
                <div className="absolute bottom-2 left-4 text-xs text-gray-500 font-medium">
                  {message.length} characters
                </div>
              )}
            </div>
            
            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className="group/btn relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white rounded-2xl hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-2xl hover:shadow-cyan-500/30 hover:scale-105 active:scale-95 disabled:hover:scale-100"
            >
              {/* Enhanced button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl blur-lg opacity-60 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              {isLoading ? (
                <Loader2 className="relative w-6 h-6 animate-spin drop-shadow-lg" />
              ) : (
                <Send className="relative w-6 h-6 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200 drop-shadow-lg" />
              )}
            </button>
          </div>
        </form>
        
        {/* Enhanced status bar */}
        <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
              <span className="font-medium">Connected to Ollama</span>
            </div>
            <div className="w-1 h-4 bg-gray-700 rounded-full"></div>
            <span className="font-medium">Mistral Model</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-medium">localhost:8000</span>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <span className="font-medium">{messages.length} messages</span>
          </div>
        </div>
      </div>
    </div>
  );
}