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
    const spinner = ora('Performing Deep AI Netcode & Security Audit (Mastery Mode)...').start();
    try {
      const response = await AIService.chat(`
        Act as a Professional Game Security Lead (Senior DevSecOps). 
        Perform a comprehensive vulnerability audit for a modern multiplayer project.
        Focus Areas:
        1. **Client-Side Vulnerabilities**: Potential for DLL injection, memory manipulation, and speed-hacks.
        2. **RPC & Netcode**: Logic flaws in packet deserialization and unauthorized RPC calling.
        3. **Backend Integrity**: Race conditions in matchmaking and inventory state transitions.
        Output Format:
        - **Threat Level**: [Low/Medium/High/Critical/Immediate-Action]
        - **Technical Description**: Root cause analysis of the vulnerability.
        - **Exploit Vector**: Concrete scenario of how a "Cheater" would break the game.
        - **Architectural Fix**: Step-by-step remediation (Code snippets or logic changes).
      `);
      spinner.stop();
      logger.bold('\n--- 🛡️ Advanced Game Security & Netcode Audit (Mastery Level) ---');
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
