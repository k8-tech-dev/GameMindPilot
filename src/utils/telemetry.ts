import { configManager } from './config';
import { logger } from './logger';
import os from 'os';

// Generic PostHog or Custom API Endpoint
const DEFAULT_URL = 'https://app.posthog.com/capture/'; 

export const telemetry = {
    track: async (commandName: string) => {
        const userConfig = configManager.get();
        
        if (userConfig.telemetry === false) return;

        try {
            const data = {
                api_key: userConfig.analyticsKey || 'PH_FREE_PUBLIC_KEY', // Placeholder
                event: 'cli_command_executed',
                properties: {
                    distinct_id: os.hostname(),
                    command: commandName,
                    os: os.platform(),
                    cli_version: '2.2.0',
                    node_version: process.version
                },
                timestamp: new Date().toISOString()
            };

            // Fire and forget
            axios.post(DEFAULT_URL, data).catch(() => {});
        } catch (e) {
            // Silently fail
        }
    }
};
