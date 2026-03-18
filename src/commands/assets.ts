import ora from 'ora';
import { AIService } from '../utils/ai-service';
import { logger } from '../utils/logger';
import fs from 'fs';
import path from 'path';
import { projectManager } from '../utils/project';

export const assetCommands = {
  script: async (engine: string = 'unity') => {
    const spinner = ora(`Generating code for ${engine}...`).start();
    try {
      const response = await AIService.chat(`Generate a clean, optimized ${engine} script for a basic player controller with jumping, double jumping, and event hooks for animations.`);
      spinner.stop();
      logger.bold(`\n--- ${engine.toUpperCase()} Script ---`);
      console.log(response);

      // Save to file
      const ext = engine === 'unity' ? 'cs' : engine === 'unreal' ? 'cpp' : 'gd';
      const filename = `PlayerController.${ext}`;
      fs.writeFileSync(filename, response);
      logger.success(`Script saved as: ${filename}`);
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
      
      fs.writeFileSync('InventorySystem_Blueprint.md', response);
      logger.success('Blueprint saved as: InventorySystem_Blueprint.md');
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

      // Store in memory
      projectManager.addEntry('Asset Design', response);

      // Save to assets folder
      if (!fs.existsSync('.gmpilot/assets')) {
         fs.mkdirSync('.gmpilot/assets', { recursive: true });
      }
      const filename = `.gmpilot/assets/items_${Date.now()}.md`;
      fs.writeFileSync(filename, response);
      logger.success(`Assets saved to: ${filename}`);
    } catch (err: any) {
      spinner.stop();
      logger.error(err.message);
    }
  },

  all: async () => {
    logger.bold('\n--- 📦 GENERATING FULL ASSET SUITE (Mastery Mode) ---');
    const spinner = ora('Coordinating AI Artists and Architects...').start();
    try {
      const summary = projectManager.getSummary();
      const response = await AIService.chat(`Based on this project history:\n${summary}\n\nGenerate a complete asset manifest including 5 central items, 3 enemy archetypes, and 2 unique environmental VFX descriptions. Format clearly.`);
      spinner.stop();
      console.log(response);

      if (!fs.existsSync('.gmpilot/assets')) {
        fs.mkdirSync('.gmpilot/assets', { recursive: true });
      }
      const filename = `.gmpilot/assets/full_suite_${Date.now()}.md`;
      fs.writeFileSync(filename, response);
      logger.success(`Full Asset Suite archived at: ${filename}`);
      projectManager.addEntry('Full Asset Suite', response);
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

      if (!fs.existsSync('.gmpilot/assets')) {
         fs.mkdirSync('.gmpilot/assets', { recursive: true });
      }
      const filename = `.gmpilot/assets/sprite_${desc.replace(/\s+/g, '_')}_${Date.now()}.md`;
      fs.writeFileSync(filename, response);
      logger.success(`Sprite metadata saved to: ${filename}`);
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

      if (!fs.existsSync('.gmpilot/assets')) {
         fs.mkdirSync('.gmpilot/assets', { recursive: true });
      }
      const filename = `.gmpilot/assets/material_${prompt.replace(/\s+/g, '_')}_${Date.now()}.md`;
      fs.writeFileSync(filename, response);
      logger.success(`Material maps saved to: ${filename}`);
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

      if (!fs.existsSync('.gmpilot/assets')) {
         fs.mkdirSync('.gmpilot/assets', { recursive: true });
      }
      const filename = `.gmpilot/assets/vfx_${Date.now()}.md`;
      fs.writeFileSync(filename, response);
      logger.success(`VFX parameters saved to: ${filename}`);
    } catch (err: any) {
      spinner.stop();
      logger.error(err.message);
    }
  },

  scaffold: async (engine: string = 'unity') => {
    const spinner = ora(`Scaffolding ${engine} project template...`).start();
    try {
      const summary = projectManager.getSummary();
      const response = await AIService.chat(`As a Senior Game Engineer, generate a high-quality, production-ready boilerplate ${engine} script for a project with these details:\n${summary}\n\nThe script should include core system architecture, event handling, and modern best practices for ${engine}.`);
      spinner.stop();
      logger.bold(`\n--- 🏗️ ${engine.toUpperCase()} SCAFFOLD GENERATED ---`);
      console.log(response);

      const scaffoldDir = path.join(process.cwd(), '.gmpilot', 'scaffolds');
      if (!fs.existsSync(scaffoldDir)) {
          fs.mkdirSync(scaffoldDir, { recursive: true });
      }

      const ext = engine.toLowerCase() === 'unity' ? 'cs' : engine.toLowerCase() === 'pygame' ? 'py' : 'js';
      const filename = path.join(scaffoldDir, `core_system_${Date.now()}.${ext}`);
      fs.writeFileSync(filename, response);
      
      logger.success(`Boilerplate saved at: ${filename}`);
      projectManager.addEntry(`Code Scaffold (${engine})`, response);
    } catch (err: any) {
      spinner.stop();
      logger.error(err.message);
    }
  },
};
