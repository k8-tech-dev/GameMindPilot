import ora from 'ora';
import { AIService } from '../utils/ai-service';
import { logger } from '../utils/logger';

export const designCommands = {
  idea: async () => {
    const spinner = ora('Brainstorming deep-logic game concepts...').start();
    try {
      const response = await AIService.chat(`
        Act as a Senior Game Design Architect. Generate 3 unique, high-potential game concepts.
        For each concept, provide:
        - **Title & Subtitle**: Catchy and descriptive.
        - **Target Audience**: Who will play this?
        - **Core Loop**: Describe the minute-to-minute gameplay.
        - **Innovation Point**: What makes it different from existing titles?
        - **Monetization Fit**: How does it generate revenue?
        - **Economy Structure**: Brief overview of currency/resources.
        Format accurately with headers and bullet points.
      `);
      spinner.stop();
      logger.bold('\n--- 🛸 Industry-Grade Game Concepts ---');
      console.log(response);
    } catch (err: any) {
      spinner.stop();
      logger.error(err.message);
    }
  },

  dialogue: async (context?: string) => {
    const spinner = ora('Architecting complex NPC dialogue...').start();
    const prompt = context 
      ? `Act as a Narrative Designer. Generate a branching dialogue for: ${context}. Include emotional tags [Fear], [Anger], [Joy], and indicate how choices affect player-NPC relationship.`
      : `Act as a Narrative Designer. Generate a complex branching dialogue for a "Shadow Merchant". 
         Requirements:
         - Minimum 3 layers of branching.
         - Include check-based options (e.g., [Charisma > 15]).
         - Highlight "World Building" lore in the dialogue.
         - Format the JSON structure clearly or use a dialogue tree format.`;
    try {
      const response = await AIService.chat(prompt);
      spinner.stop();
      logger.bold('\n--- 🎭 Narrative & Dialogue Matrix ---');
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
