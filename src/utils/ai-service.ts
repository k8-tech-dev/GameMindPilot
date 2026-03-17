import axios from 'axios';
import { configManager } from '../utils/config';

export class AIService {
  static async chat(prompt: string) {
    const config = configManager.get();
    const provider = config.selectedModel || 'gemini';

    if (provider === 'gemini') {
      return this.geminiChat(prompt, config.geminiKey, config.modelName);
    } else if (provider === 'openai') {
      return this.openaiChat(prompt, config.openaiKey, config.modelName);
    } else if (provider === 'claude') {
      return this.claudeChat(prompt, config.claudeKey, config.modelName);
    } else {
      return this.ollamaChat(prompt, config.ollamaUrl, config.modelName);
    }
  }

  static async listModels(provider: string, key?: string, url?: string): Promise<string[]> {
    if (provider === 'gemini') {
      return this.listGeminiModels(key);
    } else if (provider === 'openai') {
      return this.listOpenAIModels(key);
    } else if (provider === 'claude') {
      return ['claude-3-5-sonnet-20240620', 'claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'];
    } else {
      return this.listOllamaModels(url);
    }
  }

  private static async listGeminiModels(key?: string) {
    if (!key) throw new Error('API Key missing.');
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
    const response = await axios.get(url);
    return (response.data as any).models
      .filter((m: any) => m.supportedGenerationMethods.includes('generateContent'))
      .map((m: any) => m.name.replace('models/', ''));
  }

  private static async listOpenAIModels(key?: string) {
    if (!key) throw new Error('API Key missing.');
    const response = await axios.get('https://api.openai.com/v1/models', {
      headers: { 'Authorization': `Bearer ${key}` }
    });
    return (response.data as any).data
      .filter((m: any) => m.id.startsWith('gpt-'))
      .map((m: any) => m.id);
  }

  private static async listOllamaModels(url: string = 'http://localhost:11434') {
    try {
      const response = await axios.get(`${url}/api/tags`);
      return (response.data as any).models.map((m: any) => m.name);
    } catch {
      return ['llama3', 'mistral', 'phi3'];
    }
  }

  private static async geminiChat(prompt: string, key?: string, model: string = 'gemini-pro') {
    if (!key) throw new Error('Gemini API Key missing. Run "gmpilot login".');
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
    const response = await axios.post(url, {
      contents: [{ parts: [{ text: prompt }] }]
    });
    return (response.data as any).candidates[0].content.parts[0].text;
  }

  private static async openaiChat(prompt: string, key?: string, model: string = 'gpt-4') {
    if (!key) throw new Error('OpenAI API Key missing. Run "gmpilot login".');
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: model,
      messages: [{ role: 'user', content: prompt }]
    }, {
      headers: { 'Authorization': `Bearer ${key}` }
    });
    return (response.data as any).choices[0].message.content;
  }

  private static async claudeChat(prompt: string, key?: string, model: string = 'claude-3-5-sonnet-20240620') {
    if (!key) throw new Error('Claude API Key missing. Run "gmpilot login".');
    const response = await axios.post('https://api.anthropic.com/v1/messages', {
      model: model,
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    }, {
      headers: { 
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      }
    });
    return (response.data as any).content[0].text;
  }

  private static async ollamaChat(prompt: string, url: string = 'http://localhost:11434', model: string = 'llama3') {
    const response = await axios.post(`${url}/api/generate`, {
      model: model,
      prompt: prompt,
      stream: false
    });
    return (response.data as any).response;
  }
}
