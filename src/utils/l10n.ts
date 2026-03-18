import { AIService } from './ai-service';
import { logger } from './logger';
import fs from 'fs';
import path from 'path';

export const l10nManager = {
  translate: async (filePath: string, targetLanguages: string[]) => {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Localization file not found: ${filePath}`);
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const ext = path.extname(filePath);
    
    logger.info(`Translating ${filePath} into: ${targetLanguages.join(', ')}...`);

    const prompt = `As a Professional Game Localizer, translate the following content into these languages: ${targetLanguages.join(', ')}.
    Content (Format: ${ext}):
    ${content}
    
    Requirements:
    1. Maintain the original structure (JSON keys, CSV columns).
    2. Use gaming-appropriate terminology.
    3. Return valid ${ext} blocks for each language.`;

    const response = await AIService.chat(prompt);

    const l10nDir = path.join('.gmpilot', 'assets', 'locales');
    if (!fs.existsSync(l10nDir)) fs.mkdirSync(l10nDir, { recursive: true });

    const resultPath = path.join(l10nDir, `l10n_${Date.now()}${ext}`);
    fs.writeFileSync(resultPath, response);

    return { resultPath, response };
  }
};
