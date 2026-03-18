import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { logger } from './logger';
import { configManager } from './config';

export const audioManager = {
  generateVoice: async (text: string, voiceId: string = 'adam'): Promise<string | null> => {
    logger.info(`🎙️ Generating AI Voice for: "${text.substring(0, 30)}..."`);
    
    // Check for API Key (ElevenLabs placeholder)
    const apiKey = configManager.get().elevenLabsKey;
    if (!apiKey) {
      logger.warn('ElevenLabs API Key missing.');
      logger.info('💡 TIP: Set your key using "gmpilot login" or integrate it in config.');
      return null;
    }

    try {
      const response = await axios({
        method: 'POST',
        url: `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        data: { text, model_id: 'eleven_monolingual_v1' },
        headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
        responseType: 'arraybuffer'
      });

      const audioDir = path.join(process.cwd(), '.gmpilot', 'assets', 'audio');
      if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });

      const filename = path.join(audioDir, `voice_${Date.now()}.mp3`);
      fs.writeFileSync(filename, Buffer.from(response.data as any));
      return filename;
    } catch (err: any) {
      logger.error(`Voice Generation Error: ${err.message}`);
      return null;
    }
  },

  generateSound: async (prompt: string): Promise<string | null> => {
    logger.info(`🎵 Generating Soundscape for: "${prompt}"`);
    // NOTE: Sound generation usually requires a diff API like Stable Audio or Suno.
    // For now, we generate the Technical Metadata/Prompt for external tools.
    
    const audioDir = path.join(process.cwd(), '.gmpilot', 'assets', 'audio');
    if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });

    const filename = path.join(audioDir, `sound_prompt_${Date.now()}.md`);
    const content = `# Audio Generation Prompt\n**Subject**: ${prompt}\n\n**AI Prompt**: "High-quality, immersive sound effect for ${prompt}, professional game audio, 44.1kHz, clear spatiality."`;
    
    fs.writeFileSync(filename, content);
    return filename;
  }
};
