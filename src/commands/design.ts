import ora from 'ora';
import { AIService } from '../utils/ai-service';
import { logger } from '../utils/logger';

export const designCommands = {
  idea: async () => {
    const spinner = ora('Brainstorming deep-logic game concepts...').start();
    try {
      const response = await AIService.chat(`
        Act as a Professional Game Design Architect with 20+ years of experience. 
        Generate 3 unique, high-potential game concepts that solve specific market gaps.
        For each concept, provide:
        - **Title & Subtitle**: Catchy, brandable name.
        - **Killer USP**: Why is this unbeatable?
        - **Core Loop & Mechanics**: Detailed minute-to-minute interaction.
        - **Progression Hook**: How do you keep players for 100+ hours?
        - **Monetization Strategy**: Ethical but high-LTV approach.
        - **Technical Complexity**: Anticipated dev hurdles and AI-driven solutions.
        Format with professional Markdown headers and bullet points.
      `);
      spinner.stop();
      logger.bold('\n--- 🛸 Industry-Grade Game Concepts (Mastery Level) ---');
      console.log(response);
    } catch (err: any) {
      spinner.stop();
      logger.error(err.message);
    }
  },

  dialogue: async (context?: string) => {
    const spinner = ora('Architecting complex NPC dialogue tree...').start();
    const prompt = context 
      ? `Act as a Narrative Lead. Generate a branching dialogue for: ${context}. 
         Include 3 emotional paths: [Empathy], [Professional], [Threatening]. 
         Show how each path affects NPC 'Disposition' and 'Future Quest Availability'.`
      : `Act as a Narrative Lead. Generate a complex branching dialogue for a "Corrupted AI Overseer". 
         Requirements:
         - 4 layers of deep branching.
         - Hidden "Trait Checks" (e.g., [Intelligence > 18] or [Hacker Origin]).
         - Dynamic world-state consequences for each major choice.
         - Output in a structured Dialogue Tree format.`;
    try {
      const response = await AIService.chat(prompt);
      spinner.stop();
      logger.bold('\n--- 🎭 Narrative & Dialogue Matrix (Mastery Level) ---');
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
