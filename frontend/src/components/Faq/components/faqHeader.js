import React from 'react';
import { Search } from 'lucide-react';

export default function FaqHeader() {
  return (
    <section className="hidden sm:block">
      <header className=" bg-black px-6 py-4 flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-white" />
          </div>
          <input
            type="text"
            placeholder="Search Games and Game Providers"
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg bg-stone-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        <button className="ml-6 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors duration-200 text-sm overflow-hidden">
          Get Coins
        </button>
      </header>
    </section>
  );
}
