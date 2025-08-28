import * as http from 'http';
import fs from 'fs';

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  console.log(req.url);

  // res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.write('<h1>Hola mundo</h1>');
  // res.end();

  const data = { name: 'John Doe', age: 30, city: 'New York' };

  // res.writeHead(200, { 'Content-Type': 'application/json' });
  // res.write(JSON.stringify(data));
  // res.end();

  if (req.url === '/') {
    const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(htmlFile);
    res.end();
  } else if (req.url?.endsWith('.js')) {
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
    const jsFile = fs.readFileSync('./public/js/app.js', 'utf-8');
    res.write(jsFile);
    res.end();
  } else if (req.url?.endsWith('.css')) {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    const cssFile = fs.readFileSync('./public/css/styles.css', 'utf-8');
    res.write(cssFile);
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('404 Not Found');
    res.end();
  }
});

server.listen(8080, () => {
  console.log('Server running on port 8080');
});