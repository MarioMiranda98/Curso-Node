import express, { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

interface Props {
  port: number;
  publicPath: string;
  routes: Router;
}

export class Server {
  public readonly app = express();

  private listener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(props: Props) {
    const { port, publicPath, routes } = props;

    this.port = port;
    this.publicPath = publicPath;
    this.routes = routes;
  }

  async start() {
    this.app.use(express.json());

    this.app.use(express.static(this.publicPath));

    //Routes
    this.app.use(this.routes);

    this.app.get('*name', (req, res) => {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);

      const indexPath = path.join(
        __dirname,
        `../../${this.publicPath}/index.html`
      );
      console.log(req.url);
      // res.send('Hello World with Express and TypeScript!');
      res.sendFile(indexPath);
    });

    this.listener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  public close() {
    this.listener?.close();
  }
}
