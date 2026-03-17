import inquirer from 'inquirer';
import ora from 'ora';
import { AIService } from '../utils/ai-service';
import { logger } from '../utils/logger';

export const chatCommand = async () => {
  logger.info('Starting GameMindPilot AI Chat...');
  logger.info('Type "exit" or "quit" to end the session.');

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
      const response = await AIService.chat(input);
      spinner.stop();
      console.log(`${logger.info('Gmpilot >')} ${response}\n`);
    } catch (error: any) {
      spinner.stop();
      logger.error(`Error: ${error.message}`);
    }
  }
};
