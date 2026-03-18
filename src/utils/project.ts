import fs from 'fs';
import path from 'path';

export interface ProjectContext {
  projectName?: string;
  author?: string;
  history: Array<{
    type: string;
    timestamp: string;
    content: string;
  }>;
}

const PROJECT_DIR = '.gmpilot';
const CONTEXT_FILE = path.join(PROJECT_DIR, 'context.json');

export const projectManager = {
  isProject: (): boolean => {
    return fs.existsSync(PROJECT_DIR) && fs.lstatSync(PROJECT_DIR).isDirectory();
  },

  init: (name: string, author: string) => {
    // Legacy migration: if .gmpilot is a file, delete it
    if (fs.existsSync(PROJECT_DIR) && !fs.lstatSync(PROJECT_DIR).isDirectory()) {
      fs.unlinkSync(PROJECT_DIR);
    }

    if (!fs.existsSync(PROJECT_DIR)) {
      fs.mkdirSync(PROJECT_DIR);
    }
    const initialContext: ProjectContext = {
      projectName: name,
      author: author,
      history: []
    };
    fs.writeFileSync(CONTEXT_FILE, JSON.stringify(initialContext, null, 2));
  },

  get: (): ProjectContext => {
    if (!fs.existsSync(CONTEXT_FILE)) {
      return { history: [] };
    }
    try {
      const data = fs.readFileSync(CONTEXT_FILE, 'utf-8');
      return JSON.parse(data);
    } catch {
      return { history: [] };
    }
  },

  addEntry: (type: string, content: string) => {
    try {
      if (!projectManager.isProject()) return;
      const context = projectManager.get();
      context.history.push({
        type,
        timestamp: new Date().toISOString(),
        content
      });
      // Keep only last 10 entries to avoid token bloat
      if (context.history.length > 10) {
        context.history = context.history.slice(-10);
      }
      fs.writeFileSync(CONTEXT_FILE, JSON.stringify(context, null, 2));
    } catch (err) {
      // Silent fail to avoid crashing the main command flow
    }
  },

  getSummary: (): string => {
    try {
      if (!projectManager.isProject()) return "No project initialization found. Run 'gmpilot init' first.";
      const context = projectManager.get();
      if (context.history.length === 0) return "No previous history found for this project.";
      
      let summary = `Project: ${context.projectName} (Author: ${context.author})\n\nRecent History:\n`;
      context.history.forEach((entry, i) => {
        summary += `[${i+1}] ${entry.type} (${new Date(entry.timestamp).toLocaleString()}):\n${entry.content.substring(0, 3000)}...\n\n`;
      });
      return summary;
    } catch (err) {
      return "Error loading project history.";
    }
  }
};
