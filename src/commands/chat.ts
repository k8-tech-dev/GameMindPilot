import inquirer from 'inquirer';
import ora from 'ora';
import { AIService } from '../utils/ai-service';
import { logger } from '../utils/logger';
import { projectManager } from '../utils/project';

export const chatCommand = async () => {
  logger.info('Starting GameMindPilot AI Chat (Memory Enabled)...');
  logger.info('Type "exit" or "quit" to end the session.');

  const projectContext = projectManager.getSummary();
  const systemPrompt = `You are GameMindPilot AI. 
Current Project Context:
${projectContext}

Always refer to this context when the user asks questions about their project history or previous designs.
`;

  let conversationHistory = systemPrompt;

  while (true) {
    const { input } = await inquirer.prompt([
      {
        type: 'input',
        name: 'input',
        message: 'You >'
      }
    ]);

    if (['exit', 'quit'].includes(input.toLowerCase())) break;

    const spinner = ora('Gmpilot is thinking...').start();
    try {
      const fullPrompt = `${conversationHistory}\nUser: ${input}\nAI:`;
      const response = await AIService.chat(fullPrompt);
      spinner.stop();
      console.log(`${logger.info('Gmpilot >')} ${response}\n`);
      
      // Update local session history
      conversationHistory += `\nUser: ${input}\nAI: ${response}`;
    } catch (error: any) {
      spinner.stop();
      logger.error(`Error: ${error.message}`);
    }
  }
};
