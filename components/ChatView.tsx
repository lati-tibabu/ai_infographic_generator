import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

interface ChatViewProps {
  infographicHtml: string;
  chatHistory: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  onBack: () => void;
}

const ArrowUturnLeftIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z" clipRule="evenodd" />
    </svg>
);

const PaperAirplaneIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      {/* FIX: Replaced incorrect SVG path with a proper paper airplane icon. */}
      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
);

const ChatView: React.FC<ChatViewProps> = ({ infographicHtml, chatHistory, onSendMessage, isLoading, onBack }) => {
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const codeContainerRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // FIX: Removed useEffect that automatically switched tabs on loading. 
  // This gives the user more control and allows them to watch the code stream in if they choose.

  useEffect(() => {
      // Auto-scroll the code view as new content streams in
      if (activeTab === 'code' && codeContainerRef.current) {
        codeContainerRef.current.scrollTop = codeContainerRef.current.scrollHeight;
      }
  }, [infographicHtml, activeTab])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col lg:flex-row gap-6">
        {/* Left Side: Chat Interface */}
        <div className="flex flex-col lg:w-1/3 h-full bg-white rounded-lg border border-gray-200 shadow-xl">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold font-display text-gray-900">Edit Infographic</h2>
                <button 
                    onClick={onBack}
                    className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                   <ArrowUturnLeftIcon className="w-5 h-5"/>
                    Back
                </button>
            </div>
            <div ref={chatContainerRef} className="flex-grow p-4 space-y-4 overflow-y-auto bg-gray-50">
                {chatHistory.map((chat, index) => (
                    <div key={index} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs md:max-w-md p-3 rounded-lg shadow-sm ${chat.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 border'}`}>
                            <p className="whitespace-pre-wrap">{chat.text}</p>
                        </div>
                    </div>
                ))}
                 {isLoading && chatHistory[chatHistory.length - 1]?.role === 'user' && (
                    <div className="flex justify-start">
                        <div className="max-w-xs p-3 rounded-lg bg-white text-gray-800 border">
                           <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                           </div>
                        </div>
                    </div>
                 )}
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 flex gap-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g., Change the color scheme..."
                    className="flex-grow bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-900 placeholder-gray-500"
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading || !message.trim()} className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold p-3 rounded-lg transition-colors duration-200">
                    <PaperAirplaneIcon className="w-5 h-5"/>
                </button>
            </form>
        </div>

        {/* Right Side: Live Preview with Tabs */}
        <div className="flex-grow h-full relative flex flex-col bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
            <div className="p-2 border-b border-gray-200 flex items-center gap-2">
                <button
                    onClick={() => setActiveTab('preview')}
                    className={`px-4 py-1 rounded-md text-sm font-semibold transition-colors ${activeTab === 'preview' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                    Preview
                </button>
                <button
                    onClick={() => setActiveTab('code')}
                    className={`px-4 py-1 rounded-md text-sm font-semibold transition-colors flex items-center gap-2 ${activeTab === 'code' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                    Code
                    {isLoading && <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>}
                </button>
            </div>
            
            <div className="w-full flex-grow overflow-auto relative">
                <div className={`${activeTab === 'preview' ? 'block' : 'hidden'} w-full h-full overflow-auto`}>
                    <div className="infographic-container not-prose p-4">
                        <div dangerouslySetInnerHTML={{ __html: infographicHtml }} />
                    </div>
                </div>
                <div className={`${activeTab === 'code' ? 'block' : 'hidden'} w-full h-full bg-gray-900 text-gray-200 font-mono`}>
                    <pre ref={codeContainerRef} className="p-4 text-sm whitespace-pre-wrap h-full overflow-auto">
                        <code>{infographicHtml}</code>
                    </pre>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ChatView;
