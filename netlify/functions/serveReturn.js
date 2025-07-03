import fs from 'fs';
import path from 'path';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const filePath = path.resolve('public/return.html');

  try {
    const html = fs.readFileSync(filePath, 'utf8');
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: html,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: 'Error loading return.html',
    };
  }
}
