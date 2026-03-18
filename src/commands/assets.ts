import ora from 'ora';
import { AIService } from '../utils/ai-service';
import { logger } from '../utils/logger';
import fs from 'fs';
import path from 'path';
import { projectManager } from '../utils/project';
import { blenderManager } from '../utils/blender';
import { audioManager } from '../utils/audio';

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

  forge3d: async (prompt: string) => {
    const spinner = ora(`Forging 3D Asset: ${prompt}...`).start();
    try {
      const aiPrompt = `As a Senior Blender Technical Artist, write a Blender Python (bpy) script to create a 3D model: "${prompt}". 
      Requirements:
      1. Create the mesh procedurally.
      2. Export the result as '.glb' to a file named 'output.glb' in the current directory.
      3. ONLY return the raw Python code. No explanations, no markdown code blocks.`;

      const pythonScript = await AIService.chat(aiPrompt);
      spinner.text = 'AI script received. Launching Blender Processor...';

      if (!fs.existsSync('.gmpilot/assets')) {
          fs.mkdirSync('.gmpilot/assets', { recursive: true });
      }

      const timestamp = Date.now();
      const outputFile = path.join(process.cwd(), '.gmpilot', 'assets', `forge_${timestamp}.glb`);
      
      // We need to modify the script slightly to ensure it exports to the correct absolute path
      const modifiedScript = pythonScript + `\nimport bpy\nimport os\nbpy.ops.export_scene.gltf(filepath=r"${outputFile}")`;

      const success = await blenderManager.render3D(modifiedScript, outputFile);
      spinner.stop();

      if (success) {
        logger.success(`3D Forge Complete: ${outputFile}`);
        projectManager.addEntry('3D Forge', `Generated 3D Asset for: ${prompt}. Saved to: ${outputFile}`);
      } else {
        logger.error('3D Forge failed. Ensure Blender is installed and accessible.');
      }
    } catch (err: any) {
      spinner.stop();
      logger.error(`Forge Error: ${err.message}`);
    }
  },

  character: async (prompt: string) => {
    const spinner = ora(`Designing Character Sheet: ${prompt}...`).start();
    try {
      const response = await AIService.chat(`Generate a professional 2D Character Concept Sheet description for: "${prompt}". 
      Include:
      1. Front, Side, and Back view descriptions.
      2. Color Palette (HEX).
      3. Key Equipment & Accessories.
      4. Unique visual motifs.`);
      
      spinner.stop();
      logger.bold('\n--- 🎨 Character Concept Sheet ---');
      console.log(response);

      if (!fs.existsSync('.gmpilot/assets')) {
         fs.mkdirSync('.gmpilot/assets', { recursive: true });
      }
      const filename = `.gmpilot/assets/char_${prompt.replace(/\s+/g, '_')}_${Date.now()}.md`;
      fs.writeFileSync(filename, response);
      logger.success(`Character sheet saved to: ${filename}`);
      projectManager.addEntry('Character Design', response);
    } catch (err: any) {
      spinner.stop();
      logger.error(err.message);
    }
  },

  voice: async (text: string) => {
    const spinner = ora('Forging AI Voice...').start();
    try {
      const filename = await audioManager.generateVoice(text);
      spinner.stop();
      if (filename) {
        logger.success(`Voice-over generated: ${filename}`);
        projectManager.addEntry('Voice Gen', `Text: ${text}. Saved to: ${filename}`);
      }
    } catch (err: any) {
      spinner.stop();
      logger.error(err.message);
    }
  },

  music: async (prompt: string) => {
    const spinner = ora('Architecting Soundscape...').start();
    try {
      const filename = await audioManager.generateSound(prompt);
      spinner.stop();
      if (filename) {
        logger.success(`Soundscape prompt/metadata archived: ${filename}`);
        projectManager.addEntry('Sound Gen', `Prompt: ${prompt}. Saved to: ${filename}`);
      }
    } catch (err: any) {
      spinner.stop();
      logger.error(err.message);
    }
  },
};
