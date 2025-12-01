export interface ITicket {
  id: string;
  number: number;
  createdAt: Date;
  handleAtDesk?: string;
  handleAt?: Date;
  done: boolean;
}