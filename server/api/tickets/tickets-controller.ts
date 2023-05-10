import { Router } from "express";
import { Ticket, TicketStatus, TicketRequest } from "../../interfaces/ticket";
import tickets from "../pseudoDB";


const ticketsController = Router();

function getTicketStatus(givenStatus: string){
    switch(givenStatus){
        case 'open':
            return TicketStatus.open;
        case 'in progress':
            return TicketStatus["in progress"];
        case 'resolved':
            return TicketStatus.resolved;
        default:
            throw 'Invalid Entered Ticket Status';
    }
}

ticketsController.get('/tickets/view_all', (req, res) =>{
    return res.status(200).json(JSON.stringify(tickets));
});

ticketsController.post('/tickets/create', (req: TicketRequest, res) => {
    // get all the fields
    // if some of the fields are empty -> return status 400 
    const newTicketId: number = Number(req.params.id); // check if ID < 1
    const newTicketTitle: string = req.params.title; // check if has title
    const newTicketProjectId: number = Number(req.params.projectId); // check if has proj ID
    const newTicketAssignedTo: number = Number(req.params.assignedTo); 
    const newTicketDescription: string = req.params.description;
    // const newTicketCreateDate: string = req.params.createDate; // take instantly current date?
    // const newTicketUpdateDate: string = req.params.updateDate;
    const newTicketCreateDate: string = Date.now().toString(); // take instantly current date?
    const newTicketUpdateDate: string = Date.now().toString();
    var newTicketStatus: TicketStatus;
    try{
        newTicketStatus = getTicketStatus(req.params.status);
    }
    catch(e){
        return res.status(400).json({'message': e});
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
    res.status(200).json(JSON.stringify(createdTicket));
});

ticketsController.put('/tickets/edit/:id', (req, res) =>{
    // if id is empty -> status 400
    // find ticket with such id -> update
});

ticketsController.delete('/tickets/delete/:id', (req, res) =>{
    // if ticket with such id exists -> delete -> 200 status

});


export default ticketsController;