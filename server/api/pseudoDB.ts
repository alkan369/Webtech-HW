import { Ticket, TicketStatus } from "../interfaces/ticket";

const tickets: Ticket[] = [
    {
        id:1,
        title: 'task1',
        projectId: 2,
        assignedTo: 3,
        description: 'description1',
        createDate: Date.now().toString(),
        updateDate: Date.now().toString(),
        status: TicketStatus.open
    },
    {
        id:2,
        title: 'task2',
        projectId: 3,
        assignedTo: 4,
        description: 'description2',
        createDate: Date.now().toString(),
        updateDate: Date.now().toString(),
        status:TicketStatus.open
    },
    {
        id:3,
        title: 'task3',
        projectId: 3,
        assignedTo: 4,
        description: 'description3',
        createDate: Date.now().toString(),
        updateDate: Date.now().toString(),
        status:TicketStatus.open
    },
    {
        id:4,
        title: 'task4',
        projectId: 4,
        assignedTo: 5,
        description: 'description4',
        createDate: Date.now().toString(),
        updateDate: Date.now().toString(),
        status:TicketStatus.open
    },
    {
        id:5,
        title: 'task5',
        projectId: 5,
        assignedTo: 6,
        description: 'description5',
        createDate: Date.now().toString(),
        updateDate: Date.now().toString(),
        status:TicketStatus.open
    }
]

export default tickets;