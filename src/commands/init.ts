import inquirer from 'inquirer';
import { logger } from '../utils/logger';
import { configManager } from '../utils/config';
import { projectManager } from '../utils/project';
import { blenderManager } from '../utils/blender';

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
  
  // Initialize local project projectManager
  projectManager.init(answers.projectName, answers.author);

  logger.success(`Project "${answers.projectName}" initialized for ${answers.author}!`);
  
  const blenderPath = await blenderManager.detect();
  if (!blenderPath) {
    logger.info('💡 TIP: For 3D Asset Forge capabilities, we recommend installing Blender (https://www.blender.org/)');
  }

  logger.info('Run "gmpilot --help" to see available features.');
};
