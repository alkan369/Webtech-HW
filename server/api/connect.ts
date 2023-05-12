import { Application, Router } from "express";
import ticketsController from "./tickets/tickets-controller";

const router = Router();

export const connect = (app: Application, path: string): void =>{
    router.use('/tickets', ticketsController);

    app.use(path, router);
}