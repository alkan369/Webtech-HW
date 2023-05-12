import { Router } from "express";
import { Ticket, validTicketStatus, TicketRequest } from "../../interfaces/ticket";
import { tickets } from "../pseudoDB";

const ticketsController = Router();

ticketsController.get('/tickets/view_all', (req, res) => {
    return res.status(200).json(JSON.stringify(tickets));
});

ticketsController.get('/tickets/view/:id', (req, res) => {
    const ticketID: string = req.params.id;
    if(ticketID.length === 0){
        res.status(400).json({'message': 'empty ticket ID'});
    }
    const ticketIndex: number = tickets.findIndex(ticket => ticket.id === ticketID);
    if(ticketIndex === -1){
        res.status(400).json({'message': 'no ticket with such ID'});
    }
    return res.status(200).json(JSON.stringify(tickets[ticketIndex]));
});

ticketsController.post('/tickets/create', (req: TicketRequest, res) => {
    const newTicketId: string = String(tickets.length + 1);
    const newTicketTitle: string = req.body.title; // check if has title
    const newTicketProjectId: string = req.body.projectId; // is it ok not to have project ID
    const newTicketAssignedTo: string = req.body.assignedTo;  // is it ok not to have assigned to ID
    const newTicketDescription: string = req.body.description;
    const newTicketCreateDate: Date = new Date();
    const newTicketUpdateDate: Date = new Date();
    if (newTicketTitle.length === 0) {
        return res.status(400).json({ 'message': 'No ticket title set' });
    }
    var newTicketStatus: string;
    if (validTicketStatus.includes(req.params.status)) {
        newTicketStatus = req.params.status;
    }
    else {
        return res.status(400).json({ 'message': 'invalid status' });
    }

    const createdTicket: Ticket = {
        id: newTicketId,
        title: newTicketTitle,
        projectId: newTicketProjectId,
        assignedTo: newTicketAssignedTo,
        description: newTicketDescription,
        createDate: newTicketCreateDate,
        updateDate: newTicketUpdateDate,
        status: newTicketStatus
    };
    tickets.push(createdTicket)
    res.status(201).json(JSON.stringify(createdTicket));
});

ticketsController.put('/tickets/edit/:id', (req, res) => {
    // if id is empty -> status 400
    const ticketID = req.params.id;

    const updateDate = new Date();
    // find ticket with such id -> update
});

ticketsController.delete('/tickets/delete/:id', (req, res) => {
    // if ticket with such id exists -> delete -> 200 status
    const searchedTicket: number = tickets.findIndex(ticket => ticket.id === req.body.id);
    if (searchedTicket === -1) {
        return res.status(400).json({ 'message': 'Ticket with such id is not found' });
    }
    else {
        const removedTicket = tickets[searchedTicket];
        try {
            tickets.slice(searchedTicket, 1);
        }
        catch (error) {
            return res.status(500).json
                ({
                    'message': 'error ocurred in deleting the ticket',
                    'error': error
                });
        }
        return res.status(200).json(JSON.stringify(removedTicket));
    }
});

export default ticketsController;