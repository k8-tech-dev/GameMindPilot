import { AIService } from './ai-service';
import { projectManager } from './project';
import { logger } from './logger';

export const optiManager = {
  analyze: async (context?: string) => {
    const projectSummary = projectManager.getSummary();
    const fileList = projectManager.scanFiles();

    logger.info('Analyzing project for performance bottlenecks...');

    const prompt = `As a Senior Game Performance Engineer, perform a static optimization audit of this project:
    Project Summary: ${projectSummary}
    Files: ${fileList.join(', ')}
    Context: ${context || 'General performance and optimization audit.'}
    
    Provide actionable suggestions for:
    1. Draw Call Reduction (Atlas, Static Batching).
    2. Texture/Mesh Optimization (LOD, Compression).
    3. Code-level performance (expensive loops, allocation hotspots).
    4. Memory footprint minimization.`;

    const report = await AIService.chat(prompt);
    return report;
  }
};
