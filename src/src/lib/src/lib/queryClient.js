import { QueryClient } from '@tanstack/react-query';
import * as storage from './localStorage';

// Mock API functions using localStorage for GitHub Pages
export async function apiRequest(method, url, body) {
  await new Promise(resolve => setTimeout(resolve, 150));
  
  const pathParts = url.split('/');
  const resource = pathParts[2];
  const id = pathParts[3];

  switch (method) {
    case "GET":
      if (resource === "metrics") {
        const metrics = storage.getBusinessMetrics();
        return { json: async () => metrics };
      } else if (resource === "tasks") {
        const tasks = storage.getTasks();
        return { json: async () => tasks };
      } else if (resource === "notes") {
        const notes = storage.getNotes();
        return { json: async () => notes };
      }
      break;
      
    case "POST":
      if (resource === "metrics") {
        const metric = storage.createBusinessMetric(body);
        return { json: async () => metric };
      } else if (resource === "tasks") {
        const task = storage.createTask(body);
        return { json: async () => task };
      } else if (resource === "notes") {
        const note = storage.createNote(body);
        return { json: async () => note };
      }
      break;
      
    case "PATCH":
      if (resource === "tasks" && id) {
        const task = storage.updateTask(parseInt(id), body);
        return { json: async () => task };
      } else if (resource === "notes" && id) {
        const note = storage.updateNote(parseInt(id), body);
        return { json: async () => note };
      }
      break;
      
    case "DELETE":
      if (resource === "metrics" && id) {
        storage.deleteBusinessMetric(parseInt(id));
        return { json: async () => ({}) };
      } else if (resource === "tasks" && id) {
        storage.deleteTask(parseInt(id));
        return { json: async () => ({}) };
      } else if (resource === "notes" && id) {
        storage.deleteNote(parseInt(id));
        return { json: async () => ({}) };
      }
      break;
  }
  
  throw new Error(`Not found: ${method} ${url}`);
}

const getQueryFn = ({ on401 }) => async ({ queryKey }) => {
  const [url] = queryKey;
  try {
    const response = await apiRequest("GET", url);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
