import ora from 'ora';
import { AIService } from '../utils/ai-service';
import { logger } from '../utils/logger';

export const analysisCommands = {
  archetypes: async () => {
    const spinner = ora('Clustering playtester behavioral cohorts...').start();
    try {
      const response = await AIService.chat('Define 4 distinct player archetypes for a modern RPG based on behavioral cohorts (e.g., The Completionist, The Speedrunner). Specify their motivations and key metrics to track.');
      spinner.stop();
      logger.bold('\n--- Player Archetypes ---');
      console.log(response);
    } catch (err: any) {
      spinner.stop();
      logger.error(err.message);
    }
  },

  securityScan: async () => {
    const spinner = ora('Performing AI-powered DevSecOps scan...').start();
    try {
      const response = await AIService.chat('Simulate a security vulnerability report for a game server using AI. Include potential SQL injections, buffer overflows in netcode, and mitigation strategies.');
      spinner.stop();
      logger.bold('\n--- DevSecOps Security Scan ---');
      console.log(response);
    } catch (err: any) {
      spinner.stop();
      logger.error(err.message);
    }
  },

  abTest: async () => {
    const spinner = ora('Forecasting monetization paths...').start();
    try {
      const response = await AIService.chat('Forecast the impact of two different monetization strategies: A) Battle Pass vs B) Direct Currency Purchase. Compare projected conversion rates and LTV.');
      spinner.stop();
      logger.bold('\n--- Monetization A/B Forecast ---');
      console.log(response);
    } catch (err: any) {
      spinner.stop();
      logger.error(err.message);
    }
  },

  heapScan: async () => {
    const spinner = ora('Analyzing memory patterns...').start();
    try {
      const response = await AIService.chat('Simulate a heap analysis report for a Unity project. Identify common memory leaks like event unsubscription failures and texture bloat.');
      spinner.stop();
      logger.bold('\n--- Heap Analysis & Hotspots ---');
      console.log(response);
    } catch (err: any) {
      spinner.stop();
      logger.error(err.message);
    }
  }
};
