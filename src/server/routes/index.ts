import { Router } from 'express';
import { getContent } from '../controllers/contentController';

export const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Encord MCP Server',
    endpoints: {
      '/': 'This documentation',
      '/content': 'Get processed Encord documentation content'
    }
  });
});

router.get('/content', getContent);
