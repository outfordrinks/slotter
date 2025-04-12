import { Handler } from '@netlify/functions';
import { FigmaRequestParams, FigmaApiResponse } from '../../src/types/figma';

const FIGMA_API_BASE = 'https://api.figma.com/v1';
const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;

const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse request body
    const { fileKey, nodeId }: FigmaRequestParams = JSON.parse(event.body || '{}');

    if (!fileKey) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'fileKey is required' }),
      };
    }

    // Construct Figma API URL
    const url = `${FIGMA_API_BASE}/files/${fileKey}${nodeId ? `?node-id=${nodeId}` : ''}`;

    // Make request to Figma API
    const response = await fetch(url, {
      headers: {
        'X-Figma-Token': FIGMA_ACCESS_TOKEN || '',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        statusCode: response.status,
        body: JSON.stringify({ error }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

export { handler }; 