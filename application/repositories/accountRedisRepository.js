export default function redisAccountRepository(repository) {
  const setCache = (options) => repository.setCache(options);

  const delCache = (options) => repository.delCache(options);

  return {
    setCache,
    delCache
  };
}
