import inquirer from 'inquirer';
import { logger } from '../utils/logger';
import { configManager } from '../utils/config';

export const initCommand = async () => {
  logger.bold('--- Initializing GameMindPilot Project ---');
  
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter your project name:',
      default: 'MyAwesomeGame'
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author name:',
      default: configManager.get().user || 'Player1'
    }
  ]);

  configManager.set({ user: answers.author });
  logger.success(`Project "${answers.projectName}" initialized for ${answers.author}!`);
  logger.info('Run "gmpilot --help" to see available features.');
};
