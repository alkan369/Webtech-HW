import { Router } from "express";
import { Ticket, validTicketStatus, TicketRequest } from "../../interfaces/ticket";
import { tickets } from "../pseudoDB";

const ticketsController = Router();

ticketsController.get('/view_all', async (req, res) => {
    return await res.status(200).json(tickets);
});

ticketsController.get('/view/:id', async (req, res) => {
    const searchedTicketID: string = req.params.id;
    if (!searchedTicketID || searchedTicketID.length === 0) {
        return res.status(400).json({ 'message': 'Empty Ticket Id' });
    }
    const ticketIndex: number = await tickets.findIndex(ticket => ticket.id === searchedTicketID);
    if (ticketIndex === -1) {
        return res.status(400).json({ 'message': 'No Ticket With Such Id' });
    }
    return await res.status(200).json(tickets[ticketIndex]);
});

ticketsController.get('/view_by_project/:projectId', async (req, res) =>{
    const searchedProjectId: string = req.params.projectId;
    if(!searchedProjectId || searchedProjectId.length === 0){
        return res.status(400).json({'message': 'No Ticket Asignee Input'});
    }
    const filteredTickets = await tickets.filter(tickets => tickets.projectId === searchedProjectId);
    return res.status(200).json(filteredTickets);
})

ticketsController.get('/view_by_asignee/:assignedTo', async (req, res) =>{
    const searchedAsignee: string = req.params.assignedTo;
    if(!searchedAsignee || searchedAsignee.length === 0){
        return res.status(400).json({'message': 'No Ticket Asignee Input'});
    }
    const filteredTickets = await tickets.filter(tickets => tickets.assignedTo === searchedAsignee);
    return res.status(200).json(filteredTickets);
})

ticketsController.get('/view_by_status/:status', async (req, res) =>{
    const searchedStatus: string = req.params.status;
    if(!searchedStatus || searchedStatus.length === 0){
        return res.status(400).json({'message': 'No Ticket Status Input'});
    }
    const ticketStatusIndex: number = validTicketStatus.indexOf(searchedStatus);
    if(ticketStatusIndex === -1){
        return res.status(400).json({'message': 'Invalid Ticket Status Input'});
    }
    const filteredTickets = await tickets.filter(ticket => ticket.status === searchedStatus);
    return res.status(200).json(filteredTickets);
})


ticketsController.post('/create', async (req: TicketRequest, res) => {
    const newTicketId: string = String(tickets.length + 1);
    const newTicketTitle: string = req.body.title; // check if has title
    const newTicketProjectId: string = req.body.projectId; // is it ok not to have project ID
    const newTicketAssignedTo: string = req.body.assignedTo;  // is it ok not to have assigned to ID
    const newTicketDescription: string = req.body.description;
    const newTicketCreateDate: Date = new Date();
    const newTicketUpdateDate: Date = new Date();
    if (!newTicketTitle || newTicketTitle.length === 0) {
        return res.status(400).json({ 'message': 'No Ticket Title Set' });
    }
    const newTicketStatus: string = 'open';

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
    try {
        await tickets.push(createdTicket)
        return res.status(201).json(createdTicket);
    }
    catch (error) {
        return res.status(500).json({
            'message': 'Ticket Cannot Be Created',
            'error': error
        })
    }
});

ticketsController.put('/edit/:id', async (req, res) => {
    // if id is empty -> status 400
    const ticketID = req.params.id;
    if(!ticketID || ticketID.length === 0){
        return res.status(400).json({'message': 'No Entered Ticket Id'});
    }

    const updateDate = new Date();
    // find ticket with such id -> update
});

ticketsController.delete('/delete/:id', async (req, res) => {
    // if ticket with such id exists -> delete -> 200 status
    const searchedTicketId: string = req.params.id;
    if(!searchedTicketId || searchedTicketId.length === 0){
        return res.status(400).json({'message': 'No Ticket Id Input'});
    }
    const searchedTicket: number = await tickets.findIndex(ticket => ticket.id === searchedTicketId);
    if (searchedTicket === -1) {
        return res.status(400).json({ 'message': 'Ticket With Such Id Is Not Found' });
    }
    else {
        const removedTicket = await tickets[searchedTicket];
        try {
            await tickets.slice(searchedTicket, 1);
            return res.status(200).json(removedTicket);
        }
        catch (error) {
            return res.status(500).json
                ({
                    'message': 'Error Ocurred In Deleting The Ticket',
                    'error': error
                });
        }
    }
});

export default ticketsController;