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
  },

  sprite: async (desc: string) => {
    const spinner = ora(`Generating sprite sequence for: ${desc}...`).start();
    try {
      const response = await AIService.chat(`Generate frame-by-frame animation metadata and visual description for a sprite: ${desc}. Include frame timings, pivot points, and a description of each frame's key pose.`);
      spinner.stop();
      logger.bold('\n--- Sprite Animation Metadata ---');
      console.log(response);
    } catch (err: any) {
      spinner.stop();
      logger.error(err.message);
    }
  },

  material: async (prompt: string) => {
    const spinner = ora(`Forging material: ${prompt}...`).start();
    try {
      const response = await AIService.chat(`Generate PBR material parameters for: ${prompt}. Include Albedo, Metallic, Roughness, Normal Map strength, and Height/Displacement suggestions.`);
      spinner.stop();
      logger.bold('\n--- PBR Material Maps ---');
      console.log(response);
    } catch (err: any) {
      spinner.stop();
      logger.error(err.message);
    }
  },

  vfx: async () => {
    const spinner = ora('Generating particle system parameters...').start();
    try {
      const response = await AIService.chat('Generate detailed particle system parameters for a "Dark Magic Portal" effect. Include spawn rate, life-time color gradients, velocity curves, and sub-emitter details.');
      spinner.stop();
      logger.bold('\n--- VFX Particle Parameters ---');
      console.log(response);
    } catch (err: any) {
      spinner.stop();
      logger.error(err.message);
    }
  }
};
