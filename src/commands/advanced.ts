import ora from 'ora';
import { AIService } from '../utils/ai-service';
import { logger } from '../utils/logger';

export const advancedCommands = {
  worldBuilder: async () => {
    const spinner = ora('Designing world components...').start();
    try {
      const response = await AIService.chat('Generate a world-building framework for an open-world RPG. Include region biomes, key landmarks, weather systems, and lore hooks for 3 distinct territories.');
      spinner.stop();
      logger.bold('\n--- World Builder Dashboard ---');
      console.log(response);
    } catch (err: any) {
      spinner.stop();
      logger.error(err.message);
    }
  },

  questGraph: async () => {
    const spinner = ora('Mapping quest dependencies...').start();
    try {
      const response = await AIService.chat('Create a quest graph for a multi-stage mission. Detail the nodes (objectives), edges (dependencies), and branching points based on player choices.');
      spinner.stop();
      logger.bold('\n--- Quest Graph Visualizer ---');
      console.log(response);
    } catch (err: any) {
      spinner.stop();
      logger.error(err.message);
    }
  },

  behaviorTrees: async () => {
    const spinner = ora('Generating AI behavior tree...').start();
    try {
      const response = await AIService.chat('Generate a behavior tree for a stealth-focused enemy. Include states like Patrol, Investigate, Pursue, and Search, with transition conditions.');
      spinner.stop();
      logger.bold('\n--- Behavior Tree Architect ---');
      console.log(response);
    } catch (err: any) {
      spinner.stop();
      logger.error(err.message);
    }
  },

  storyboarder: async () => {
    const spinner = ora('Creating scene storyboard...').start();
    try {
      const response = await AIService.chat('Outline a 5-panel storyboard for an epic boss introduction cinematic. Describe the camera angles, lighting, and key actions for each panel.');
      spinner.stop();
      logger.bold('\n--- Storyboarder Draft ---');
      console.log(response);
    } catch (err: any) {
      spinner.stop();
      logger.error(err.message);
    }
  }
};
