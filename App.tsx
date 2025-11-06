import React, { useState, useRef } from 'react';
import { Chat } from '@google/genai';
import Header from './components/common/Header';
import InputView from './components/InputView';
import InfographicView from './components/InfographicView';
import ChatView from './components/ChatView';
import { generateInfographicStream, createChatSession } from './services/geminiService';
import { ChatMessage } from './types';

type View = 'input' | 'result' | 'editing';

function App() {
  const [view, setView] = useState<View>('input');
  const [isLoading, setIsLoading] = useState(false);
  const [infographicHtml, setInfographicHtml] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const chatSessionRef = useRef<Chat | null>(null);

  const handleGenerate = async (text: string) => {
    setIsLoading(true);
    setView('result'); 
    setInfographicHtml('');
    setChatHistory([]);
    chatSessionRef.current = null;
    try {
      const stream = await generateInfographicStream(text);
      let html = '';
      for await (const chunk of stream) {
        html += chunk.text;
        setInfographicHtml(html);
      }
    } catch (error) {
      console.error("Error generating infographic:", error);
      alert("An error occurred while generating the infographic. Please try again.");
      setView('input');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEdit = () => {
    chatSessionRef.current = createChatSession();
    setChatHistory([]);
    setView('editing');
  };
  
  const handleStartOver = () => {
    setView('input');
    setInfographicHtml('');
    setChatHistory([]);
    chatSessionRef.current = null;
  };

  const handleSendMessage = async (message: string) => {
    if (!chatSessionRef.current) return;
    
    setIsLoading(true);
    const userMessage: ChatMessage = { role: 'user', text: message };
    setChatHistory(prev => [...prev, userMessage]);
    
    const fullPrompt = `Here is the current HTML:\n\n---\n${infographicHtml}\n---\n\nUser request: ${message}`;
    
    try {
      const stream = await chatSessionRef.current.sendMessageStream({ message: fullPrompt });
      let html = '';
      
      for await (const chunk of stream) {
        html += chunk.text;
        setInfographicHtml(html);
      }
      setChatHistory(prev => [...prev, {role: 'model', text: html}]);

    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred during the chat. Please try again.");
      // remove the user's message on error
      setChatHistory(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const renderView = () => {
    switch (view) {
      case 'input':
        return <InputView onGenerate={handleGenerate} isLoading={isLoading} />;
      case 'result':
        return <InfographicView 
                    infographicHtml={infographicHtml} 
                    onEdit={handleEdit} 
                    onStartOver={handleStartOver}
                    isLoading={isLoading}
                />;
      case 'editing':
        return <ChatView 
                  infographicHtml={infographicHtml} 
                  chatHistory={chatHistory}
                  onSendMessage={handleSendMessage}
                  isLoading={isLoading}
                  onBack={() => setView('result')}
                />;
      default:
        return <InputView onGenerate={handleGenerate} isLoading={isLoading} />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-800">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {renderView()}
      </main>
    </div>
  );
}

export default App;
