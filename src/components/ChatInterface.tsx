import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Trash2 } from 'lucide-react';
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
        content: 'Sorry, I encountered an error while processing your message. Please make sure your Ollama FastAPI server is running on http://localhost:8000/chat',
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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Ollama Chat</h1>
              <p className="text-sm text-gray-500">Powered by your local Ollama model</p>
            </div>
          </div>
          <button
            onClick={clearConversation}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">Clear</span>
          </button>
        </div>
      </header>

      {/* Chat Container */}
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <MessageList messages={messages} isLoading={isLoading} />
        <div ref={messagesEndRef} />
        <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
}