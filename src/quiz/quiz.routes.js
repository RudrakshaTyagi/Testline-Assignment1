import express from 'express';
import { fetchCurrentQuizData, fetchHistoricalQuizData, fetchSubmittedQuizData } from './quiz.controller.js';

const quizRouter = express.Router();

quizRouter.get('/latest', (req, res, next) => {
      fetchCurrentQuizData(req,res,next);
})
quizRouter.get('/submitted', (req, res, next) => {
      fetchSubmittedQuizData(req,res,next);
})
quizRouter.get('/historical', (req, res, next) => {
      fetchHistoricalQuizData(req,res,next);
})

export default quizRouter;