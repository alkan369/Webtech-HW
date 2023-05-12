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