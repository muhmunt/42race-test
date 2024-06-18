import activityController from '../../../adapters/controllers/activityController';
import activityDbRepository from '../../../application/repositories/activityDbRepository';
import activityDbRepositoryMongoDB from '../../database/mongoDB/repositories/activityRepositoryMongoDB';
import accountCaching from "../middlewares/accountCachingMiddleware";

export default function activityRouter(express, redisClient) {
  const router = express.Router();

  // load controller with dependencies
  const controller = activityController(
    activityDbRepository,
    activityDbRepositoryMongoDB,
  );

  // GET endpoints
  router
    .route('/activity')
    .get(
      accountCaching(redisClient), controller.fetchAllActivity
    );

  router
    .route('/activity/:id')
    .get(
      accountCaching(redisClient), controller.fetchActivityById
    );

  // DELETE endpoints
  router
    .route('/activity/:id')
    .delete(
      accountCaching(redisClient), controller.deleteById
    );


  return router;
}
