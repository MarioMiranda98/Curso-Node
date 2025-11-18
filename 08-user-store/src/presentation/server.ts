import express, { Router } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import fileUpload from 'express-fileupload';

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

export class Server {
  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start() {
    this.app.use(express.json()); // application/json
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
    this.app.use(bodyParser.json()); // raw
    this.app.use(bodyParser.urlencoded({ extended: true })); // x-www-form-urlencoded
    this.app.use(fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 }
    }));

    this.app.use(express.static(this.publicPath));

    this.app.use(this.routes);

    this.app.get('*name', (_req, res) => {
      const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
      res.sendFile(indexPath);
    });

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });

  }

  public close() {
    this.serverListener?.close();
  }
}
