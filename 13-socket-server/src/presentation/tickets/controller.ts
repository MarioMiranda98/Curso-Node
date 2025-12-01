import type { Request, Response } from 'express';
import { TicketService } from '../services/ticket.service.js';

export class TicketController {
  constructor(
    private readonly ticketsService: TicketService = new TicketService(),
  ) { }

  public getTickets = async (req: Request, res: Response) => {
    res.json(this.ticketsService.tickets);
  }

  public getLastTicketNumber = async (req: Request, res: Response) => {
    res.json(this.ticketsService.lastTicketNumber);
  }

  public pendingTickets = async (req: Request, res: Response) => {
    res.json(this.ticketsService.pendingTickets);
  }

  public createTicket = async (req: Request, res: Response) => {
    res.status(201).json(this.ticketsService.createTicket());
  }

  public drawTicket = async (req: Request, res: Response) => {
    const { desk } = req.params;

    res.json(this.ticketsService.drawTicket(desk || ''));
  }

  public ticketFinished = async (req: Request, res: Response) => {
    const { ticketId } = req.params;

    res.json(this.ticketsService.onFinishedTicket(ticketId || ''));
  }

  public workingOn = async (req: Request, res: Response) => {
    res.json(this.ticketsService.lastWorkingOnTickets);
  }
}