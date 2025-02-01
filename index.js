import express from "express";
import cookieParser from "cookie-parser";
import quizRouter from "./src/quiz/quiz.routes.js";
import analyticsRouter from "./src/analytics/analytics.routes.js";

const server = express();

server.use(express.json());
server.use(cookieParser());

server.use('/api/quiz', quizRouter); // for quiz related routes
server.use("/api/analytics", analyticsRouter); // for analytics related routes

server.use((req, res) => { // for invalid urls, so placed at last
      res.status(404)
      .json({ success: false, msg: `Invalid path: ${req.originalUrl}` });
});

export default server;