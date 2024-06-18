export default function accountCachingMiddleware(redisClient) {
  return async function (req, res, next) {
    const athleteId = req.header('athleteid');
    const accessToken = req.header('authorization')?.split(' ')[1];

    if (!athleteId || !accessToken) {
      return res.status(401).json({ message: 'Access token or athleteId missing' });
    }

    try {
      redisClient.get(`access_token:${athleteId}`, (err, storedAccessToken) => {
        if (err) {
          console.error('Redis error:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }

        if (!storedAccessToken || storedAccessToken !== accessToken) {
          return res.status(403).json({ message: 'Access token expired or invalid' });
        }

        req.athleteId = athleteId;
        next();
      });
    } catch (error) {
      console.error('Error in accountCachingMiddleware:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}
