import React, { useEffect } from 'react';
import { Switch, Route } from 'wouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { initializeSampleData } from './lib/localStorage';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import DataEntry from './pages/DataEntry';
import Notes from './pages/Notes';
import Reports from './pages/Reports';
import Analytics from './pages/Analytics';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import { ThemeProvider } from './components/ThemeProvider';

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/tasks" component={Tasks} />
      <Route path="/data-entry" component={DataEntry} />
      <Route path="/notes" component={Notes} />
      <Route path="/reports" component={Reports} />
      <Route>404 - Page Not Found</Route>
    </Switch>
  );
}

function App() {
  useEffect(() => {
    initializeSampleData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <div className="min-h-screen flex flex-col lg:flex-row bg-background text-foreground">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <MobileNav />
            <main className="flex-1 overflow-auto">
              <Router />
            </main>
          </div>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
