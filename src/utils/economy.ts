import { AIService } from './ai-service';
import { projectManager } from './project';
import { logger } from './logger';
import fs from 'fs';
import path from 'path';

export const economyManager = {
  analyze: async (narrativeContext: string): Promise<string> => {
    logger.info('🧠 AI Economists at work... Analyzing game loops...');
    
    const summary = projectManager.getSummary();
    const prompt = `As a Senior Game Economy Designer, analyze this game project's summary and specific context:
    
    Project Summary: ${summary}
    Current Focus: ${narrativeContext}
    
    Task:
    1. Identify 3 critical "Monetization Nodes" (where players feel value).
    2. Suggest an IAP (In-App Purchase) strategy that respects player agency.
    3. Analyze potential "Hyper-Casual" vs "Hardcore" monetization balance.
    4. Propose a "Season Pass" or "Battle Pass" tier structure if applicable.
    
    Format the response as a professional Technical Report.`;

    const report = await AIService.chat(prompt);
    
    if (!fs.existsSync('.gmpilot/analysis')) {
      fs.mkdirSync('.gmpilot/analysis', { recursive: true });
    }
    
    const filename = path.join('.gmpilot/analysis', `economy_report_${Date.now()}.md`);
    fs.writeFileSync(filename, report);
    
    return report;
  }
};
