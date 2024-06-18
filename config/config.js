export default {
  port: process.env.PORT || 3002,
  ip: process.env.HOST || '0.0.0.0',
  mongo: {
    uri: process.env.MONGO_URL || 'mongodb://localhost:27017/test-42race'
  },
  redis: {
    uri: process.env.REDIS_URL || 'redis://localhost:6379'
  },
  jwtSecret: process.env.JWT_SECRET || 'jkl!±@£!@ghj1237'
};
