import React, { useState } from 'react';

interface InputViewProps {
  onGenerate: (text: string) => void;
  isLoading: boolean;
}

const SparklesIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd" />
        <path d="M5.26 17.242a.75.75 0 10-1.06-1.06 7.5 7.5 0 0110.607-10.607.75.75 0 00-1.06-1.06 9 9 0 00-12.728 12.728.75.75 0 001.06 1.06z" />
    </svg>
);


const InputView: React.FC<InputViewProps> = ({ onGenerate, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onGenerate(text);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold font-display text-gray-800 mb-2 text-center">Transform Your Text into an Infographic</h2>
      <p className="text-gray-500 mb-8 text-center max-w-2xl">
        Simply paste your content below, and our AI will craft a beautiful, shareable infographic for you in seconds.
      </p>
      <form onSubmit={handleSubmit} className="w-full">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your article, report, or data here..."
          className="w-full h-64 p-4 bg-white border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-gray-900 placeholder-gray-400 resize-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !text.trim()}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg shadow-indigo-500/30"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <SparklesIcon className="w-6 h-6" />
              <span>Process Infographic</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default InputView;