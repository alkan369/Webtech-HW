// import dotenv from 'dotenv';

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import { Application, json } from "express";
import { connect as connectAPI } from "./api/connect";

dotenv.config();

const app: Application = express();

app.use(json());
// app.use(cors());

connectAPI(app, '/api');

app.get("/", (req, res) => {
    return res.status(200).json({'message':'Hello World!'});
});
  
const PORT = process.env.PORT || 3001

try {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}
catch(error){
    console.log("Failed to start the server with error : ${error}");
}
