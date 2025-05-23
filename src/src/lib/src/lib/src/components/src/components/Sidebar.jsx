import React from 'react';
import { useLocation } from 'wouter';
import { useTheme } from './ThemeProvider';
import { 
  Home, 
  BarChart3, 
  CheckSquare, 
  PlusCircle, 
  StickyNote, 
  FileText,
  Moon,
  Sun
} from 'lucide-react';

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Data Entry", href: "/data-entry", icon: PlusCircle },
  { name: "Notes", href: "/notes", icon: StickyNote },
  { name: "Reports", href: "/reports", icon: FileText },
];

export default function Sidebar() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl text-gray-900 dark:text-white">BusinessPro</span>
        </div>
      </div>
      
      <nav className="flex-1 p-6 space-y-2">
        {navigation.map((item) => {
          const isActive = location === item.href;
          const Icon = item.icon;
          
          return (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </a>
          );
        })}
      </nav>
      
      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</span>
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-gray-700 dark:text-gray-300" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </aside>
  );
}
