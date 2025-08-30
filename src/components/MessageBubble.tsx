import React from 'react';
import { Bot, User, Copy, Check, AlertCircle } from 'lucide-react';
import { Message } from '../types/chat';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = React.useState(false);
  const isUser = message.sender === 'user';
  const isError = message.isError;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className={`group flex items-start space-x-4 ${isUser ? 'flex-row-reverse space-x-reverse' : ''} animate-in slide-in-from-bottom-4 duration-700`}>
      {/* Avatar */}
      <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl transition-all duration-300 group-hover:scale-105 ${
        isUser 
          ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 shadow-blue-500/25' 
          : isError
          ? 'bg-gradient-to-br from-red-500 to-pink-600 shadow-red-500/25'
          : 'bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 shadow-cyan-500/25'
      }`}>
        {!isUser && !isError && (
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 rounded-2xl blur-md opacity-60 animate-pulse"></div>
        )}
        {isUser ? (
          <User className="relative w-6 h-6 text-white drop-shadow-lg" />
        ) : isError ? (
          <AlertCircle className="relative w-6 h-6 text-white drop-shadow-lg" />
        ) : (
          <Bot className="relative w-6 h-6 text-white drop-shadow-lg" />
        )}
      </div>

      {/* Message Content */}
      <div className={`max-w-4xl ${isUser ? 'text-right' : 'text-left'} relative`}>
        <div className={`relative inline-block px-6 py-4 rounded-3xl shadow-2xl transition-all duration-300 hover:shadow-3xl ${
          isUser
            ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white border border-blue-400/20 shadow-blue-500/20'
            : isError
            ? 'bg-red-900/60 border border-red-500/40 text-red-100 backdrop-blur-xl shadow-red-500/20'
            : 'bg-gray-800/90 border border-gray-600/40 text-gray-100 backdrop-blur-xl hover:bg-gray-800/95 shadow-gray-900/50'
        }`}>
          {/* Enhanced glow effect */}
          {!isUser && !isError && (
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-purple-500/15 rounded-3xl blur-xl opacity-80"></div>
          )}
          
          <div className="relative">
            <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base font-medium tracking-wide">{message.content}</p>
            
            {/* Enhanced copy button for AI messages */}
            {!isUser && (
              <button
                onClick={handleCopy}
                className="absolute -top-3 -right-3 w-9 h-9 bg-gray-700/90 hover:bg-gray-600/90 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm border border-gray-600/50 hover:border-gray-500/70 shadow-lg hover:shadow-xl hover:scale-105"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-300" />
                )}
              </button>
            )}
          </div>
        </div>
        <div className={`mt-3 text-xs text-gray-500 font-medium ${isUser ? 'text-right' : 'text-left'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}