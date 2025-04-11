import { Router } from 'express';
import { getContent } from '../controllers/contentController';
import { sseHandler } from '../controllers/sseController';

export const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Encord MCP Server',
    endpoints: {
      '/': 'This documentation',
      '/content': 'Get processed Encord documentation content',
      '/sse': 'Server-Sent Events endpoint for Windsurf'
    }
  });
});

router.get('/content', getContent);
router.get('/sse', sseHandler);
