import inquirer from 'inquirer';
import ora from 'ora';
import { AIService } from '../utils/ai-service';
import { configManager } from '../utils/config';
import { logger } from '../utils/logger';

export const loginCommand = async () => {
  logger.bold('--- GameMindPilot Configuration ---');
  
  const providerAns = await inquirer.prompt([
    {
      type: 'list',
      name: 'provider',
      message: 'Select your AI provider:',
      pageSize: 10,
      choices: [
        { name: 'Google Gemini', value: 'gemini' },
        { name: 'OpenAI', value: 'openai' },
        { name: 'Anthropic Claude', value: 'claude' },
        { name: 'Local Ollama', value: 'ollama' }
      ],
      default: configManager.get().selectedModel || 'gemini'
    }
  ]);

  const provider = providerAns.provider;

  const authAns = await inquirer.prompt([
    {
      type: 'input',
      name: 'apiKey',
      message: `Enter your ${provider} API Key:`,
      when: provider !== 'ollama',
      validate: (input) => input.length > 0 ? true : 'API Key cannot be empty.'
    },
    {
      type: 'input',
      name: 'ollamaUrl',
      message: 'Enter Ollama Base URL:',
      default: 'http://localhost:11434',
      when: provider === 'ollama'
    }
  ]);

  const spinner = ora(`Fetching supported models for ${provider}...`).start();
  let models: string[] = [];
  try {
    models = await AIService.listModels(provider, authAns.apiKey, authAns.ollamaUrl);
    spinner.succeed(`Fetched ${models.length} models.`);
  } catch (error: any) {
    spinner.fail(`Failed to fetch models: ${error.message}`);
    logger.warn('Using default fallback models.');
    models = provider === 'gemini' ? ['gemini-1.5-pro', 'gemini-pro'] : ['gpt-4', 'gpt-3.5-turbo'];
  }

  const modelAns = await inquirer.prompt([
    {
      type: 'list',
      name: 'modelName',
      message: `Select a model:`,
      choices: models,
      default: configManager.get().modelName || models[0]
    }
  ]);

  const update: any = { 
    selectedModel: provider,
    modelName: modelAns.modelName
  };

  if (provider === 'gemini') update.geminiKey = authAns.apiKey;
  if (provider === 'openai') update.openaiKey = authAns.apiKey;
  if (provider === 'claude') update.claudeKey = authAns.apiKey;
  if (provider === 'ollama') update.ollamaUrl = authAns.ollamaUrl;

  configManager.set(update);
  logger.success(`Successfully configured ${provider}! Selected model: ${modelAns.modelName}`);
};

export const logoutCommand = async () => {
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Are you sure you want to log out? This will clear all stored API keys.',
      default: false
    }
  ]);

  if (confirm) {
    configManager.clear();
    logger.success('Successfully logged out. All credentials have been cleared.');
  } else {
    logger.info('Logout cancelled.');
  }
};
