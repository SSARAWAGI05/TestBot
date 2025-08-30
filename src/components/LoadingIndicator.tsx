import React from 'react';
import { Bot, Brain, Sparkles } from 'lucide-react';

export default function LoadingIndicator() {
  return (
    <div className="flex items-start space-x-4 animate-in slide-in-from-bottom-4 duration-700">
      {/* Enhanced Avatar */}
      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-xl shadow-cyan-500/25">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 rounded-2xl blur-md opacity-60 animate-pulse"></div>
        <Bot className="relative w-6 h-6 text-white drop-shadow-lg" />
        <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-spin" />
      </div>

      {/* Enhanced Loading Message */}
      <div className="max-w-4xl">
        <div className="relative inline-block px-6 py-4 rounded-3xl bg-gray-800/90 border border-gray-600/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-purple-500/15 rounded-3xl blur-xl opacity-80"></div>
          
          <div className="relative flex items-center space-x-4">
            <div className="relative">
              <Brain className="w-6 h-6 text-cyan-400 animate-pulse drop-shadow-lg" />
              <div className="absolute inset-0 bg-cyan-400/30 rounded-full blur-md animate-ping"></div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-gray-200 font-medium tracking-wide">AI is thinking</span>
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-bounce shadow-lg shadow-cyan-400/50"></div>
                <div className="w-2.5 h-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce shadow-lg shadow-blue-500/50" style={{ animationDelay: '0.15s' }}></div>
                <div className="w-2.5 h-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce shadow-lg shadow-purple-500/50" style={{ animationDelay: '0.3s' }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-500 font-medium">
          Processing your request...
        </div>
      </div>
    </div>
  );
}