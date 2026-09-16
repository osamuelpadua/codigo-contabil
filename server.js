const http = require('http');
const handler = require('serve-handler');

const port = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: '.',
    directoryListing: false,
    headers: [
      {
        // imagens não mudam de nome sem mudar de conteúdo: cache longo
        source: 'assets/img/**',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        // CSS/JS usam ?v= no index.html para invalidar o cache
        source: 'assets/{css,js}/**',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800' }],
      },
    ],
  });
});

server.listen(port, () => {
  console.log(`Servindo em http://localhost:${port}`);
});
