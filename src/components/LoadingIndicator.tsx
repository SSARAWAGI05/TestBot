import React from 'react';
import { Bot, Loader2 } from 'lucide-react';

export default function LoadingIndicator() {
  return (
    <div className="flex items-start space-x-3">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
        <Bot className="w-5 h-5 text-white" />
      </div>

      {/* Loading Message */}
      <div className="max-w-3xl">
        <div className="inline-block px-4 py-3 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-2">
            <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
        <div className="mt-1 text-xs text-gray-500">
          AI is thinking...
        </div>
      </div>
    </div>
  );
}