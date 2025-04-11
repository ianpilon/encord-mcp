import { Request, Response } from 'express';

export const sseHandler = (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Send initial connection message
  res.write('event: connected\ndata: {"status":"connected"}\n\n');

  const heartbeat = setInterval(() => {
    res.write('event: heartbeat\ndata: {"timestamp":' + Date.now() + '}\n\n');
  }, 5000);

  req.on('close', () => {
    clearInterval(heartbeat);
  });

  // Keep the connection alive
  req.on('end', () => {
    clearInterval(heartbeat);
  });
};
