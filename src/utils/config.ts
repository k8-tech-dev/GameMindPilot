import fs from 'fs';
import path from 'path';
import os from 'os';

const CONFIG_DIR = path.join(os.homedir(), '.gmpilot');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

export interface Config {
  geminiKey?: string;
  openaiKey?: string;
  claudeKey?: string;
  ollamaUrl?: string;
  selectedModel?: 'gemini' | 'openai' | 'claude' | 'ollama';
  modelName?: string;
  user?: string;
}

export const configManager = {
  init: () => {
    if (!fs.existsSync(CONFIG_DIR)) {
      fs.mkdirSync(CONFIG_DIR);
    }
    if (!fs.existsSync(CONFIG_FILE)) {
      fs.writeFileSync(CONFIG_FILE, JSON.stringify({}, null, 2));
    }
  },

  get: (): Config => {
    try {
      const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
      return JSON.parse(data);
    } catch {
      return {};
    }
  },

  set: (newConfig: Partial<Config>) => {
    const current = configManager.get();
    const updated = { ...current, ...newConfig };
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(updated, null, 2));
  },

  clear: () => {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify({}, null, 2));
  }
};
