import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

interface Props {
  port: number;
  publicPath: string;
}

export class Server {
  private app = express();

  private readonly port: number;
  private readonly publicPath: string;

  constructor(props: Props) {
    const { port, publicPath } = props;

    this.port = port;
    this.publicPath = publicPath;
  };

  async start() {

    this.app.use(express.static(this.publicPath));

    this.app.get('*name', (req, res) => {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);

      const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`);
      console.log(req.url);
      // res.send('Hello World with Express and TypeScript!');
      res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  };
}