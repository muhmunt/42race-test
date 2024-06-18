import authRouter from './auth';
import stravaRouter from './strava';
import accountRouter from './account';
import activityRouter from './activity';

export default function routes(app, express, redisClient) {
  app.use('/api/v1/login', authRouter(express, redisClient));
  app.use('/api/v1', stravaRouter(express, redisClient));
  app.use('/api/v1', accountRouter(express, redisClient));
  app.use('/api/v1', activityRouter(express, redisClient));
}
