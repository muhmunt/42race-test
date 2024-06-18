export default function AccountRepositoryRedis() {
  return function cachingClient(redisClient) {
    const setCache = ({ key, expireTimeSec, data }) =>
      redisClient.setex(key, expireTimeSec, data);

    const delCache = (athleteId) => 
      redisClient.del(`access_token:${athleteId}`)

    return {
      setCache,
      delCache
    };
  };
}
