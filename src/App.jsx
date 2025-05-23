import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          BusinessPro Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Total Revenue</h3>
            <p className="text-2xl font-bold text-green-600">$45,250</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Active Tasks</h3>
            <p className="text-2xl font-bold text-blue-600">8</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Notes</h3>
            <p className="text-2xl font-bold text-purple-600">12</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Welcome!</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Your business dashboard is working! 🎉 This is a simplified version to test the basic functionality.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
