// import dotenv from 'dotenv';

const dotenv = require('dotenv');
const express = require('express');

import { Application, json } from "express";
import { connect as connectAPI } from "./api/connect";

dotenv.config();

const app: Application = express();
app.use(json);

connectAPI(app, '/api');

app.get("/", (req, res) => {
    res.send("Hello World!");
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