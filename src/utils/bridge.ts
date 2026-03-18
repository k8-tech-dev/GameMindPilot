import http from 'http';
import { logger } from './logger';
import { projectManager } from './project';

export const bridgeManager = {
  start: (port: number = 4242) => {
    logger.info(`🌐 Starting Engine Bridge on port ${port}...`);
    
    const server = http.createServer((req, res) => {
      // Set CORS for engine editors
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
      }

      if (req.url === '/sync' && req.method === 'GET') {
        const status = {
          projectName: projectManager.getSummary(),
          timestamp: Date.now(),
          connected: true,
          status: 'online'
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(status));
      } else if (req.url === '/push' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
          logger.info(`📥 Engine Sync Received: ${body.substring(0, 50)}...`);
          projectManager.addEntry('Engine Live Sync', body);
          res.writeHead(200);
          res.end('OK');
        });
      } else {
        res.writeHead(404);
        res.end();
      }
    });

    server.listen(port, () => {
      logger.success(`🚀 Engine Bridge live at http://localhost:${port}`);
      logger.info('💡 Connect your Unity/Godot plugin to this endpoint for live sync.');
    });

    return server;
  }
};
