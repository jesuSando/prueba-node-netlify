import fs from 'fs';
import path from 'path';
import { URLSearchParams } from 'url';

export async function handler(event) {
  try {
    // Leer el archivo return.html
    const filePath = path.join(process.cwd(), 'public', 'return.html');
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Si es POST, procesar los parámetros
    if (event.httpMethod === 'POST') {
      const params = new URLSearchParams(event.body);
      const token = params.get('token');
      const status = params.get('status');
      
      // Inyectar los parámetros en el HTML
      html = html.replace('</head>', `
        <script>
          window.flowParams = {
            token: "${token || ''}",
            status: "${status || '0'}"
          };
        </script>
        </head>
      `);
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache'
      },
      body: html
    };
    
  } catch (err) {
    console.error('Error en serveReturn:', err);
    return {
      statusCode: 500,
      body: 'Error al procesar la página de retorno'
    };
  }
}