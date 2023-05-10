// import { config } from 'dotenv';
import dotenv from 'dotenv';
import express from 'express';

// config();
dotenv.config();

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});
  
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});