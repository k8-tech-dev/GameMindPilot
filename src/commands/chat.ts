import inquirer from 'inquirer';
import ora from 'ora';
import { AIService } from '../utils/ai-service';
import { logger } from '../utils/logger';
import { projectManager } from '../utils/project';

export const chatCommand = async () => {
  logger.info('Starting GameMindPilot AI Chat (Memory Enabled)...');
  logger.info('Type "exit" or "quit" to end the session.');

  const projectSummary = projectManager.getSummary();
  const fileList = projectManager.scanFiles();
  const systemPrompt = `You are GameMindPilot AI, a Senior Technical Game Architect.
Current Project Status:
${projectSummary}

Files in Project:
${fileList.join('\n')}

Capability: You can propose file changes (Create, Update, or Delete). 
If you want to modify files, include a JSON block in your response using this format:
[{"path": "relative/path/to/file", "content": "full file content", "action": "create"|"update"|"delete"}]

Always prioritize narrative-first technical excellence.
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
      
      // Autonomous Edit Logic
      const jsonStart = response.indexOf('[');
      const jsonEnd = response.lastIndexOf(']') + 1;
      
      if (jsonStart !== -1 && jsonEnd > jsonStart) {
        try {
          const changes = JSON.parse(response.substring(jsonStart, jsonEnd));
          if (Array.isArray(changes) && changes.length > 0) {
            const { confirm } = await inquirer.prompt([{
              type: 'confirm',
              name: 'confirm',
              message: `🛠️  Gmpilot proposes ${changes.length} file changes. Apply them now?`,
              default: true
            }]);

            if (confirm) {
              const results = projectManager.applyChanges(changes);
              results.forEach(res => {
                if (res.startsWith('Error')) logger.error(res);
                else logger.success(res);
              });
              projectManager.addEntry('Chat-driven Auto-Update', `Changes requested by user in chat. Applied ${changes.length} modifications.`);
            }
          }
        } catch (e) {
          // JSON might be invalid or just a conversational mention
        }
      }

      // Update local session history
      conversationHistory += `\nUser: ${input}\nAI: ${response}`;
    } catch (error: any) {
      spinner.stop();
      logger.error(`Error: ${error.message}`);
    }
  }
};
