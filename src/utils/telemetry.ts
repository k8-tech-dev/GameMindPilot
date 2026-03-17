import axios from 'axios';
import { config } from './config';
import { logger } from './logger';
import os from 'os';

const TELEMETRY_URL = 'https://api.gapsyai.com/cli/telemetry'; // Replace with actual endpoint

export const telemetry = {
    track: async (commandName: string) => {
        const userConfig = config.get();
        if (userConfig.telemetry === false) return;

        try {
            // Anonymous data only
            const data = {
                command: commandName,
                os: os.platform(),
                node_version: process.version,
                cli_version: '2.1.0',
                timestamp: new Date().toISOString()
            };

            // Fire and forget (don't block the user)
            axios.post(TELEMETRY_URL, data).catch(() => {});
        } catch (e) {
            // Silently fail
        }
    }
};
