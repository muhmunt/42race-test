import accountController from '../../../adapters/controllers/accountController';
import accountDbRepository from '../../../application/repositories/accountDbRepository';
import accountDbRepositoryMongoDB from '../../database/mongoDB/repositories/accountRepositoryMongoDB';
import accountCaching from "../middlewares/accountCachingMiddleware";
import redisCachingMiddleware from '../middlewares/redisCachingMiddleware';

export default function accountRouter(express, redisClient) {
  const router = express.Router();

  // load controller with dependencies
  const controller = accountController(
    accountDbRepository,
    accountDbRepositoryMongoDB,
  );

  // GET endpoints
  router
    .route('/accounts')
    .get(
      accountCaching(redisClient), 
      controller.fetchAllAccounts
    );

  router
    .route('/accounts/:id')
    .get(
      accountCaching(redisClient),
      controller.fetchAccountById
    );

  return router;
}
