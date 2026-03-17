import ora from 'ora';
import { AIService } from '../utils/ai-service';
import { logger } from '../utils/logger';

export const designCommands = {
  idea: async () => {
    const spinner = ora('Brainstorming game concepts...').start();
    try {
      const response = await AIService.chat('Generate 3 unique and creative game concepts. Include title, genre, and a 2-sentence hook for each.');
      spinner.stop();
      logger.bold('\n--- Game Concepts ---');
      console.log(response);
    } catch (err: any) {
      spinner.stop();
      logger.error(err.message);
    }
  },

  dialogue: async (context?: string) => {
    const spinner = ora('Writing NPC dialogue...').start();
    const prompt = context 
      ? `Generate NPC dialogue for the following context: ${context}`
      : 'Generate a branching NPC dialogue for a mysterious shopkeeper who knows a secret about the player.';
    try {
      const response = await AIService.chat(prompt);
      spinner.stop();
      logger.bold('\n--- NPC Dialogue ---');
      console.log(response);
    } catch (err: any) {
      spinner.stop();
      logger.error(err.message);
    }
  },

  quest: async () => {
    const spinner = ora('Designing side quest...').start();
    try {
      const response = await AIService.chat('Generate a detailed side quest including objectives, possible rewards, and a plot twist.');
      spinner.stop();
      logger.bold('\n--- Quest Design ---');
      console.log(response);
    } catch (err: any) {
      spinner.stop();
      logger.error(err.message);
    }
  },

  level: async (theme: string = 'dungeon') => {
    const spinner = ora(`Generating ${theme} level layout...`).start();
    try {
      const response = await AIService.chat(`Generate a text-based level layout for a ${theme} level including room descriptions, traps, and enemy placements.`);
      spinner.stop();
      logger.bold(`\n--- ${theme.toUpperCase()} Level Layout ---`);
      console.log(response);
    } catch (err: any) {
      spinner.stop();
      logger.error(err.message);
    }
  }
};
