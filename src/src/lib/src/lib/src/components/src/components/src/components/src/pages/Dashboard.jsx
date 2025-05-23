import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { DollarSign, CheckSquare, TrendingUp, Star } from 'lucide-react';

export default function Dashboard() {
  const { data: metrics = [], isLoading: metricsLoading } = useQuery({
    queryKey: ["/api/metrics"],
  });

  const { data: tasks = [], isLoading: tasksLoading } = useQuery({
    queryKey: ["/api/tasks"],
  });

  const { data: notes = [], isLoading: notesLoading } = useQuery({
    queryKey: ["/api/notes"],
  });

  // Calculate KPIs
  const revenueMetrics = metrics.filter(m => m.type === 'revenue');
  const totalRevenue = revenueMetrics.reduce((sum, m) => sum + parseFloat(m.value), 0);
  const activeTasks = tasks.filter(t => t.status !== 'completed').length;
  const conversionMetrics = metrics.filter(m => m.type === 'conversion_rate');
  const avgConversionRate = conversionMetrics.length > 0 
    ? conversionMetrics.reduce((sum, m) => sum + parseFloat(m.value), 0) / conversionMetrics.length 
    : 0;

  return (
    <div className="p-4 lg:p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <header>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome back! Here's what's happening with your business.
        </p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-green-600 dark:text-green-400 font-medium">
              {revenueMetrics.length} entries
            </span>
            <span className="text-gray-600 dark:text-gray-400 ml-2">tracked</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Tasks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{activeTasks}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
              <CheckSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              {tasks.filter(t => t.status === 'completed').length} completed
            </span>
            <span className="text-gray-600 dark:text-gray-400 ml-2">total</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Conversion</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {avgConversionRate.toFixed(2)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-purple-600 dark:text-purple-400 font-medium">
              {conversionMetrics.length} entries
            </span>
            <span className="text-gray-600 dark:text-gray-400 ml-2">recorded</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Notes</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{notes.length}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-xl flex items-center justify-center">
              <Star className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-amber-600 dark:text-amber-400 font-medium">
              {notes.filter(n => new Date(n.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length} this week
            </span>
            <span className="text-gray-600 dark:text-gray-400 ml-2">added</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Tasks</h3>
          {tasksLoading ? (
            <div className="text-center text-gray-600 dark:text-gray-400 py-8">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="text-center text-gray-600 dark:text-gray-400 py-8">
              No tasks yet. Create your first task to get started.
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    task.status === 'completed' ? 'bg-green-500' : 
                    task.status === 'in_progress' ? 'bg-amber-500' : 'bg-red-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{task.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{task.assignee || 'Unassigned'}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    task.priority === 'high' ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300' :
                    task.priority === 'medium' ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300' :
                    'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Notes</h3>
          {notesLoading ? (
            <div className="text-center text-gray-600 dark:text-gray-400 py-8">Loading notes...</div>
          ) : notes.length === 0 ? (
            <div className="text-center text-gray-600 dark:text-gray-400 py-8">
              No notes yet. Create your first note to capture important insights.
            </div>
          ) : (
            <div className="space-y-4">
              {notes.slice(0, 3).map((note) => (
                <div key={note.id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{note.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      note.category === 'strategy' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' :
                      note.category === 'feedback' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300' :
                      note.category === 'meeting' ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300' :
                      'bg-gray-100 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300'
                    }`}>
                      {note.category || 'general'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{note.content}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
