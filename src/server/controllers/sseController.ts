import { Request, Response } from 'express';

export const sseHandler = (req: Request, res: Response) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  const heartbeat = setInterval(() => {
    res.write('data: heartbeat\n\n');
  }, 15000);

  req.on('close', () => {
    clearInterval(heartbeat);
  });
};
