import { Router } from "express";
import { TicketController } from "./controller.js";

export class TicketRoutes {
  constructor() { }

  public static get routes() {
    const router = Router();
    const ticketController: TicketController = new TicketController();

    router.get('/', ticketController.getTickets);
    router.get('/last', ticketController.getLastTicketNumber);
    router.get('/pending', ticketController.pendingTickets);
    router.get('/draw/:desk', ticketController.drawTicket);

    router.post('/', ticketController.createTicket);
    router.put('/done/:ticketId', ticketController.ticketFinished);

    router.get('/working-on', ticketController.workingOn);

    return router;
  }
}