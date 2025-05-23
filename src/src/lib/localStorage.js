// Local Storage Keys
const STORAGE_KEYS = {
  METRICS: 'businesspro_metrics',
  TASKS: 'businesspro_tasks',
  NOTES: 'businesspro_notes',
  COUNTERS: 'businesspro_counters'
};

const getCounters = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.COUNTERS);
  return stored ? JSON.parse(stored) : { metricId: 1, taskId: 1, noteId: 1 };
};

const updateCounters = (counters) => {
  localStorage.setItem(STORAGE_KEYS.COUNTERS, JSON.stringify(counters));
};

// Business Metrics
export const getBusinessMetrics = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.METRICS);
  if (!stored) return [];
  
  const metrics = JSON.parse(stored);
  return metrics.map(m => ({
    ...m,
    date: new Date(m.date),
    createdAt: new Date(m.createdAt)
  }));
};

export const createBusinessMetric = (data) => {
  const counters = getCounters();
  const metric = {
    ...data,
    id: counters.metricId++,
    notes: data.notes || null,
    createdAt: new Date()
  };
  
  const existing = getBusinessMetrics();
  existing.push(metric);
  localStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify(existing));
  updateCounters(counters);
  
  return metric;
};

export const deleteBusinessMetric = (id) => {
  const existing = getBusinessMetrics();
  const filtered = existing.filter(m => m.id !== id);
  localStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify(filtered));
};

// Tasks
export const getTasks = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
  if (!stored) return [];
  
  const tasks = JSON.parse(stored);
  return tasks.map(t => ({
    ...t,
    dueDate: t.dueDate ? new Date(t.dueDate) : null,
    createdAt: new Date(t.createdAt)
  }));
};

export const createTask = (data) => {
  const counters = getCounters();
  const task = {
    ...data,
    id: counters.taskId++,
    description: data.description || null,
    assignee: data.assignee || null,
    priority: data.priority || 'medium',
    status: data.status || 'pending',
    completed: data.completed || false,
    createdAt: new Date()
  };
  
  const existing = getTasks();
  existing.push(task);
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(existing));
  updateCounters(counters);
  
  return task;
};

export const updateTask = (id, updates) => {
  const existing = getTasks();
  const index = existing.findIndex(t => t.id === id);
  
  if (index === -1) {
    throw new Error(`Task with id ${id} not found`);
  }
  
  const updatedTask = { ...existing[index], ...updates };
  existing[index] = updatedTask;
  
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(existing));
  return updatedTask;
};

export const deleteTask = (id) => {
  const existing = getTasks();
  const filtered = existing.filter(t => t.id !== id);
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(filtered));
};

// Notes
export const getNotes = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.NOTES);
  if (!stored) return [];
  
  const notes = JSON.parse(stored);
  return notes.map(n => ({
    ...n,
    createdAt: new Date(n.createdAt)
  }));
};

export const createNote = (data) => {
  const counters = getCounters();
  const note = {
    ...data,
    id: counters.noteId++,
    category: data.category || 'general',
    createdAt: new Date()
  };
  
  const existing = getNotes();
  existing.push(note);
  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(existing));
  updateCounters(counters);
  
  return note;
};

export const updateNote = (id, updates) => {
  const existing = getNotes();
  const index = existing.findIndex(n => n.id === id);
  
  if (index === -1) {
    throw new Error(`Note with id ${id} not found`);
  }
  
  const updatedNote = { ...existing[index], ...updates };
  existing[index] = updatedNote;
  
  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(existing));
  return updatedNote;
};

export const deleteNote = (id) => {
  const existing = getNotes();
  const filtered = existing.filter(n => n.id !== id);
  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(filtered));
};

// Initialize with sample data
export const initializeSampleData = () => {
  const metrics = getBusinessMetrics();
  const tasks = getTasks();
  const notes = getNotes();
  
  if (metrics.length === 0 && tasks.length === 0 && notes.length === 0) {
    // Sample metrics
    const sampleMetrics = [
      { type: 'revenue', value: '12500', date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), notes: 'Q1 sales performance' },
      { type: 'revenue', value: '15800', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), notes: 'Product launch boost' },
      { type: 'expenses', value: '4200', date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), notes: 'Marketing costs' },
      { type: 'customers', value: '245', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), notes: 'New acquisitions' },
      { type: 'conversion_rate', value: '3.2', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), notes: 'Website optimization' }
    ];
    sampleMetrics.forEach(metric => createBusinessMetric(metric));
    
    // Sample tasks
    const sampleTasks = [
      { title: 'Complete Q1 financial review', description: 'Analyze revenue trends', priority: 'high', status: 'in_progress', assignee: 'Sarah Johnson', dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), completed: false },
      { title: 'Update marketing materials', description: 'Refresh branding', priority: 'medium', status: 'pending', assignee: 'Mike Chen', dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), completed: false },
      { title: 'Customer feedback analysis', description: 'Process survey responses', priority: 'low', status: 'completed', assignee: 'Lisa Park', completed: true }
    ];
    sampleTasks.forEach(task => createTask(task));
    
    // Sample notes
    const sampleNotes = [
      { title: 'Strategic Planning Session', content: 'Key insights from quarterly planning. Focus: customer retention, product development, market expansion.', category: 'strategy' },
      { title: 'Customer Feedback Summary', content: 'Customers requesting more mobile features and faster support. Consider chat support investment.', category: 'feedback' },
      { title: 'Team Meeting Notes', content: 'Discussed product roadmap and resources. Need 2 more developers by Q2.', category: 'meeting' }
    ];
    sampleNotes.forEach(note => createNote(note));
  }
};
