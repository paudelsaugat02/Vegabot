import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Menu, X } from 'lucide-react';

export default function VegaBot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm VegaBot ∞, your AI-powered assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage) => {
    const responses = [
      "That's a great question! Let me help you with that.",
      "I understand what you're looking for. Here's what I think...",
      "Interesting! Based on your query, I'd suggest...",
      "I'm processing that information. Here's my analysis...",
      "Thanks for asking! Let me provide you with some insights.",
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return `${randomResponse} Your message was: "${userMessage}". This is a demo response showing VegaBot's conversational capabilities!`;
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: generateBotResponse(input),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed lg:relative lg:translate-x-0 z-30 w-64 bg-slate-800/50 backdrop-blur-xl border-r border-purple-500/20 transition-transform duration-300 ease-in-out h-full`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <h1 className="text-xl font-bold text-white">VegaBot ∞</h1>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <button className="w-full text-left px-4 py-3 rounded-lg bg-purple-600/20 border border-purple-500/30 text-purple-300 hover:bg-purple-600/30 transition-colors">
              New Chat
            </button>
            <div className="pt-4 border-t border-slate-700">
              <p className="text-xs text-gray-500 mb-3">Recent Chats</p>
              <div className="space-y-2">
                <div className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:bg-slate-700/50 cursor-pointer transition-colors">
                  Getting Started
                </div>
                <div className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:bg-slate-700/50 cursor-pointer transition-colors">
                  AI Capabilities
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-700">
          <div className="text-xs text-gray-500">
            <p>Powered by React & Tailwind</p>
            <p className="mt-1">© 2024 VegaBot</p>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-slate-800/30 backdrop-blur-xl border-b border-purple-500/20 px-6 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            <Bot className="w-8 h-8 text-purple-400" />
            <div>
              <h2 className="text-lg font-semibold text-white">VegaBot ∞</h2>
              <p className="text-xs text-gray-400">AI-Powered Assistant</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-4 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                message.sender === 'bot' 
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
                  : 'bg-gradient-to-br from-blue-500 to-cyan-500'
              }`}>
                {message.sender === 'bot' ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}
              </div>
              <div className={`flex-1 max-w-2xl ${message.sender === 'user' ? 'flex justify-end' : ''}`}>
                <div className={`rounded-2xl px-6 py-4 ${
                  message.sender === 'bot'
                    ? 'bg-slate-800/50 border border-purple-500/20 text-gray-100'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className="text-xs mt-2 opacity-60">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-slate-800/50 border border-purple-500/20 rounded-2xl px-6 py-4">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-purple-500/20 bg-slate-800/30 backdrop-blur-xl px-6 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  rows="1"
                  className="w-full bg-slate-700/50 border border-purple-500/30 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none"
                  style={{ minHeight: '56px', maxHeight: '200px' }}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={input.trim() === ''}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl px-6 py-4 transition-all duration-200 hover:scale-105 disabled:hover:scale-100 flex items-center gap-2 font-medium"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">VegaBot may produce inaccurate information. This is a demo interface.</p>
          </div>
        </div>
      </div>
    </div>
  );
}