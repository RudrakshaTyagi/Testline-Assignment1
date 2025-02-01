import express from 'express';
import { studentPerformance,generalInsights, predictRank, predictCollege } from './analytics.controller.js';

const analyticsRouter = express.Router();

analyticsRouter.get('/studentperformance', (req, res, next) => {
      studentPerformance(req, res, next);
});

analyticsRouter.get('/generalinsights', (req, res, next) => {
      generalInsights(req, res, next);
});

analyticsRouter.get('/predict-rank', (req, res, next) => {
      predictRank(req, res, next);
});

analyticsRouter.get('/predict-college', (req, res, next) => {
      predictCollege(req, res, next);
});

export default analyticsRouter;