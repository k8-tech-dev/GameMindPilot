import ora from 'ora';
import { AIService } from '../utils/ai-service';
import { logger } from '../utils/logger';

export const assetCommands = {
  script: async (engine: string = 'unity') => {
    const spinner = ora(`Generating code for ${engine}...`).start();
    try {
      const response = await AIService.chat(`Generate a clean, optimized ${engine} script for a basic player controller with jumping, double jumping, and event hooks for animations.`);
      spinner.stop();
      logger.bold(`\n--- ${engine.toUpperCase()} Script ---`);
      console.log(response);
    } catch (err: any) {
      spinner.stop();
      logger.error(err.message);
    }
  },

  blueprint: async () => {
    const spinner = ora('Generating game system boilerplate...').start();
    try {
      const response = await AIService.chat('Provide a detailed architecture blueprint for a modular inventory system, including class definitions, interface requirements, and data persistence strategy.');
      spinner.stop();
      logger.bold('\n--- Game System Blueprint ---');
      console.log(response);
    } catch (err: any) {
      spinner.stop();
      logger.error(err.message);
    }
  },

  item: async () => {
    const spinner = ora('Designing procedural assets...').start();
    try {
      const response = await AIService.chat('Generate 5 unique procedurally-generated items/enemies for a fantasy RPG. Include stats, loot drops, and a brief description of their visual design/behavior.');
      spinner.stop();
      logger.bold('\n--- Procedural Assets (Item/Enemy) ---');
      console.log(response);
    } catch (err: any) {
      spinner.stop();
      logger.error(err.message);
    }
  }
};
