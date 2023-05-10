import { Request } from "express"

export enum TicketStatus{
    'open',
    'in progress',
    'resolved'
}

export interface Ticket{
    id: number,
    title: string,
    projectId: number,
    assignedTo: number,
    description: string,
    createDate: string, // date ?
    updateDate: string, // date ?
    status: TicketStatus
}

export interface TicketRequest extends Request{
    ticket: Ticket;
}