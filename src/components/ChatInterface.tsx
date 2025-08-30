import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Trash2, Sparkles, Zap, Wifi } from 'lucide-react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { Message } from '../types/chat';
import { sendMessageToOllama } from '../services/ollamaApi';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant powered by Ollama. How can I help you today?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessageToOllama(content);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error while processing your message. Please make sure your Ollama FastAPI server is running on http://localhost:8000',
        sender: 'ai',
        timestamp: new Date(),
        isError: true,
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearConversation = () => {
    setMessages([
      {
        id: '1',
        content: 'Hello! I\'m your AI assistant powered by Ollama. How can I help you today?',
        sender: 'ai',
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50 shadow-2xl">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative w-14 h-14 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                <MessageCircle className="w-8 h-8 text-white" />
                <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-300 animate-bounce" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Ollama Chat
              </h1>
              <div className="flex items-center space-x-3 mt-1">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                  <span className="text-sm text-gray-300 font-medium">Connected</span>
                </div>
                <div className="w-1 h-4 bg-gray-600 rounded-full"></div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-400">Mistral AI</span>
                </div>
                <div className="w-1 h-4 bg-gray-600 rounded-full"></div>
                <div className="flex items-center space-x-2">
                  <Wifi className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-400">localhost:8000</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={clearConversation}
            className="group flex items-center space-x-3 px-5 py-3 text-gray-400 hover:text-white hover:bg-gray-800/60 rounded-xl transition-all duration-300 border border-gray-700/50 hover:border-gray-600/70 backdrop-blur-sm shadow-lg hover:shadow-xl"
          >
            <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">Clear Chat</span>
          </button>
        </div>
      </header>

      {/* Chat Container */}
      <main className="relative z-10 flex-1 flex flex-col max-w-6xl mx-auto w-full">
        <MessageList messages={messages} isLoading={isLoading} />
        <div ref={messagesEndRef} />
        <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} messages={messages} />
      </main>
    </div>
  );
}