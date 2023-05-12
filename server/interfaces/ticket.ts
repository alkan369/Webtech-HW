import { Request } from "express"

export const validTicketStatus = ['open', 'in progress', 'resolved'];

export interface Ticket{
    id: string,
    title: string,
    projectId: string,
    assignedTo: string,
    description: string,
    createDate: Date,
    updateDate: Date,
    status: string
}

export interface TicketRequest extends Request{
    ticket: Ticket;
}