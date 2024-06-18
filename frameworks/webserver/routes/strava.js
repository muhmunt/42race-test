import stravaController from '../../../adapters/controllers/stravaController';
import accountDbRepository from '../../../application/repositories/accountDbRepository';
import accountDbRepositoryMongoDB from '../../database/mongoDB/repositories/accountRepositoryMongoDB';
import activityDbRepository from '../../../application/repositories/activityDbRepository';
import activityDbRepositoryMongoDB from '../../database/mongoDB/repositories/activityRepositoryMongoDB';
import accountRedisRepository from '../../../application/repositories/accountRedisRepository';
import accountRedisRepositoryImpl from '../../database/redis/accountRepositoryRedis';
import accountCaching from "../middlewares/accountCachingMiddleware";

import dotenv from 'dotenv';
dotenv.config();

export default function stravaRouter(express, redisClient) {
  const router = express.Router();

  // load controller with dependencies
  const controller = stravaController(
    accountDbRepository,
    accountDbRepositoryMongoDB,
    redisClient,
    accountRedisRepository,
    accountRedisRepositoryImpl,
    activityDbRepository,
    activityDbRepositoryMongoDB
  );


  router.route('/callback').get(controller.fetchCallback);
  router.route('/strava/logout').get(accountCaching(redisClient), controller.deAuthorize);

  return router;
}
