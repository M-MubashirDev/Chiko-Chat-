import express from "express";
import { createServer } from "http";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Connection from "./connection/db.js";
import socket from "./utilities/socket.js"; // Import Socket.io setup
import authRoute from "./routes/Users.js";

dotenv.config();
const app = express();
const server = createServer(app); // Create HTTP server

app.use(cors());
app.use(express.json());

//connection
Connection()


//routes
app.use("/api", authRoute);

// Initialize Socket.io
const io = socket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
