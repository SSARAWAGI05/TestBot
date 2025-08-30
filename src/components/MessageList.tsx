import React from 'react';
import MessageBubble from './MessageBubble';
import LoadingIndicator from './LoadingIndicator';
import { Sparkles, Stars, Zap } from 'lucide-react';
import { Message } from '../types/chat';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8 relative">
      {/* Enhanced welcome message for empty state */}
      {messages.length === 1 && (
        <div className="text-center py-16 relative">
          {/* Floating elements */}
          <div className="absolute top-8 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
          <div className="absolute top-16 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-80"></div>
          <div className="absolute bottom-8 left-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce opacity-70"></div>
          
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-60 animate-pulse"></div>
            <div className="relative w-24 h-24 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/25">
              <Sparkles className="w-12 h-12 text-white drop-shadow-lg" />
              <Stars className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-spin" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">
            Welcome to Ollama Chat
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto leading-relaxed text-lg mb-8">
            Your intelligent AI assistant is ready to help. Ask questions, get code assistance, or engage in meaningful conversations.
          </p>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { icon: Zap, title: 'Lightning Fast', desc: 'Powered by local Ollama' },
              { icon: Sparkles, title: 'Smart Responses', desc: 'Advanced AI reasoning' },
              { icon: Stars, title: 'Private & Secure', desc: 'Your data stays local' }
            ].map((feature, index) => (
              <div key={index} className="group p-4 bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300 hover:bg-gray-800/60">
                <feature.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-200" />
                <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isLoading && <LoadingIndicator />}
    </div>
  );
}