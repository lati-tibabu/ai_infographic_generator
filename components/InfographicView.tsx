import React from 'react';

interface InfographicViewProps {
  infographicHtml: string;
  onEdit: () => void;
  onStartOver: () => void;
  isLoading: boolean;
}

const PencilSquareIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a.5.5 0 00-.124.238l-2 6.5a.5.5 0 00.65.65l6.5-2a.5.5 0 00.238-.124l12.15-12.15z" />
      <path d="M15.75 4.5a.75.75 0 01.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 01.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 01.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75v-7.5a.75.75 0 01.75-.75h.008z" />
    </svg>
);

const ArrowPathIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-4.5a.75.75 0 000 1.5h6a.75.75 0 00.75-.75v-6a.75.75 0 00-1.5 0v4.502l-1.741-1.741A9 9 0 103 12a.75.75 0 001.5 0 7.5 7.5 0 01.255-1.941z" clipRule="evenodd" />
    </svg>
);


const InfographicView: React.FC<InfographicViewProps> = ({ infographicHtml, onEdit, onStartOver, isLoading }) => {
  return (
    <div className="flex flex-col">
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold font-display text-gray-900">Generated Infographic</h2>
          <div className="flex items-center gap-4">
              <button 
                  onClick={onEdit}
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md"
              >
                 <PencilSquareIcon className="w-5 h-5"/>
                  Edit with AI
              </button>
              <button 
                  onClick={onStartOver}
                  className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                 <ArrowPathIcon className="w-5 h-5"/>
                  Start Over
              </button>
          </div>
      </div>
      <div className="flex-grow p-4 md:p-8 bg-gray-50 border border-gray-200 rounded-lg shadow-inner relative min-h-[60vh]">
         {isLoading && !infographicHtml && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-10 rounded-lg">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600 font-semibold">Generating your infographic...</p>
                </div>
            </div>
         )}
         <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
            <div className="infographic-container not-prose p-6" dangerouslySetInnerHTML={{ __html: infographicHtml }} />
         </div>
      </div>
    </div>
  );
};

export default InfographicView;
