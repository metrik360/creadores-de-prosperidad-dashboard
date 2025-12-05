// Simple CORS Proxy Server for Google Sheets
// Run with: node server.js
// Then access dashboard at: http://localhost:3000/

const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQWN6hZhglRb3xq_EtW5WkutefYhmJ6b8jb1hNyV1L4q5p2iuyYWUBSkSze1vXpVUQyoNkOk4S8MFi0/pub?gid=739894217&single=true&output=csv';

const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Route 1: GET /csv - Returns CSV data
    if (req.url === '/csv' && req.method === 'GET') {
        console.log('📡 Obteniendo datos de Google Sheets...');

        // Function to follow redirects
        const fetchWithRedirects = (urlToFetch, callback, redirectCount = 0) => {
            if (redirectCount > 5) {
                callback(new Error('Demasiadas redirecciones'));
                return;
            }

            https.get(urlToFetch, (sheetRes) => {
                // Handle redirects (307, 302, etc.)
                if (sheetRes.statusCode >= 300 && sheetRes.statusCode < 400 && sheetRes.headers.location) {
                    console.log(`   → Siguiendo redirección (${sheetRes.statusCode})...`);
                    const redirectUrl = sheetRes.headers.location.startsWith('http')
                        ? sheetRes.headers.location
                        : 'https://' + new URL(urlToFetch).hostname + sheetRes.headers.location;
                    fetchWithRedirects(redirectUrl, callback, redirectCount + 1);
                    return;
                }

                // If not 200, it's an error
                if (sheetRes.statusCode !== 200) {
                    callback(new Error(`HTTP ${sheetRes.statusCode}`));
                    return;
                }

                let data = '';

                sheetRes.on('data', chunk => {
                    data += chunk;
                });

                sheetRes.on('end', () => {
                    callback(null, data);
                });
            }).on('error', callback);
        };

        fetchWithRedirects(SHEET_URL, (err, data) => {
            if (err) {
                console.error('✗ Error obteniendo Google Sheets:', err.message);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'No se pudo obtener Google Sheets', details: err.message }));
                return;
            }

            if (!data || data.length < 100) {
                console.error('✗ Datos CSV vacíos o muy pequeños');
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Los datos CSV están vacíos' }));
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/csv; charset=utf-8',
                'Cache-Control': 'max-age=300' // Cache de 5 minutos
            });
            res.end(data);
            const lineCount = data.split('\n').length;
            console.log(`✓ CSV enviado correctamente: ${lineCount} líneas`);
        });

        return;
    }

    // Route 2: GET / - Serve index.html
    if (req.url === '/' || req.url === '/index.html') {
        const filePath = path.join(__dirname, 'index.html');

        fs.readFile(filePath, 'utf8', (err, content) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File not found</h1>');
                return;
            }

            // Inject the API endpoint into the HTML
            const modifiedContent = content.replace(
                "const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/",
                "const SHEET_URL = '/csv'; const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/"
            );

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(modifiedContent);
        });

        return;
    }

    // Route 3: Serve static files (CSS, JS, etc.)
    const filePath = path.join(__dirname, req.url);

    try {
        const stats = fs.statSync(filePath);
        if (stats.isFile()) {
            fs.readFile(filePath, (err, content) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Server error');
                    return;
                }

                const ext = path.extname(filePath);
                const contentTypes = {
                    '.html': 'text/html',
                    '.css': 'text/css',
                    '.js': 'application/javascript',
                    '.json': 'application/json',
                    '.png': 'image/png',
                    '.jpg': 'image/jpeg',
                    '.svg': 'image/svg+xml'
                };

                res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' });
                res.end(content);
            });

            return;
        }
    } catch (err) {
        // File doesn't exist, fall through to 404
    }

    // 404 Not Found
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
    console.log('\n');
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║  📊 MÉTRIK Dashboard - Servidor Proxy Iniciado        ║');
    console.log('╚════════════════════════════════════════════════════════╝');
    console.log(`\n✓ Servidor escuchando en: http://localhost:${PORT}`);
    console.log(`✓ Dashboard disponible en: http://localhost:${PORT}/`);
    console.log(`✓ API de datos en: http://localhost:${PORT}/csv\n`);
    console.log('Presiona Ctrl+C para detener el servidor.\n');
});

console.log('🚀 Iniciando servidor...');
