### Repository For Server Prototype Homework on Webtech Course

----
### The Server now only supports pseudoDB for Tickets

The ticket is present in way:
    
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

And the valid statuses for a Ticket are:
    
    open
    in progress
    resolved

The requests that the server supports are:
    
    GET
        To view all the tickets
        To view a particular ticket by Id
        To view all tickets by projectId
        To view all tickets by asignee
        To view all tickets by status

    POST
        To create a new ticket
    
    PUT
        To edit an existing ticket

    DELETE
        To delete an existing ticket