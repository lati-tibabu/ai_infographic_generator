import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold font-display text-gray-900 tracking-tight">
                AI Infographic Generator
            </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
