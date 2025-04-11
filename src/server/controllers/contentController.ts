import { Request, Response } from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';

export const getContent = async (req: Request, res: Response) => {
  try {
    const url = 'https://docs.encord.com/platform-documentation/GettingStarted/encord-introduction';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Remove unnecessary elements
    $('script').remove();
    $('style').remove();
    $('nav').remove();
    $('header').remove();
    $('footer').remove();

    const title = $('title').text() || 'Introduction to Encord - Encord';
    const content = $('main').text() || $('body').text();

    const result = {
      url,
      title,
      content: content.trim(),
      metadata: {
        lastModified: new Date().toLocaleString()
      },
      timestamp: Date.now()
    };

    res.json(result);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
};
