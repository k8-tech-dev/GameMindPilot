import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { logger } from './logger';

const execAsync = promisify(exec);

export const blenderManager = {
  detect: async (): Promise<string | null> => {
    const commonPaths = [
      'blender', // If in PATH
      'C:\\Program Files\\Blender Foundation\\Blender\\blender.exe',
      'C:\\Program Files\\Blender Foundation\\Blender 3.6\\blender.exe',
      'C:\\Program Files\\Blender Foundation\\Blender 4.0\\blender.exe',
      '/Applications/Blender.app/Contents/MacOS/Blender',
      '/usr/bin/blender'
    ];

    for (const p of commonPaths) {
      try {
        await execAsync(`${p.includes(' ') ? `"${p}"` : p} --version`);
        return p;
      } catch (e) {
        continue;
      }
    }
    return null;
  },

  render3D: async (pythonScript: string, outputFile: string): Promise<boolean> => {
    const blenderPath = await blenderManager.detect();
    if (!blenderPath) {
      logger.warn('Blender not detected on this system.');
      logger.info('💡 TIP: For 3D Asset Forge, install Blender: https://www.blender.org/download/');
      return false;
    }

    const scriptPath = path.join(process.cwd(), '.gmpilot', 'temp_blender_script.py');
    fs.writeFileSync(scriptPath, pythonScript);

    try {
      logger.info('🚀 Launching Headless Blender Forge...');
      const command = `"${blenderPath}" --background --python "${scriptPath}"`;
      await execAsync(command);
      logger.success(`3D Asset generated successfully: ${outputFile}`);
      return true;
    } catch (err: any) {
      logger.error(`Blender Forge Error: ${err.message}`);
      return false;
    } finally {
      if (fs.existsSync(scriptPath)) fs.unlinkSync(scriptPath);
    }
  }
};
