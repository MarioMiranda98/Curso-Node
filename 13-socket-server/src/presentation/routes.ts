import { Router } from 'express';
import { TicketRoutes } from './tickets/routes.js';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/ticket', TicketRoutes.routes);

    return router;
  }
}
