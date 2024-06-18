import getToken from '../../application/use_cases/strava/getToken';
import addAccount from '../../application/use_cases/strava/add';
import deauthorize from '../../application/use_cases/strava/deauthorize';
import getActivity from '../../application/use_cases/strava/getActivity';

export default function stravaController(
  accountDbRepository,
  accountDbRepositoryImpl,
  cachingClient,
  accountCachingRepository,
  accountCachingRepositoryImpl,
  activityDbRepository,
  activityDbRepositoryImpl
) {

  const dbRepository = accountDbRepository(accountDbRepositoryImpl());
  const dbActivityRepository = activityDbRepository(activityDbRepositoryImpl());
  const cachingRepository = accountCachingRepository(
    accountCachingRepositoryImpl()(cachingClient)
  );

  const fetchCallback = async (req, res, next) => {
    const { code } = req.query;

    await getToken(code)
      .then((response) => {
        return response
      })
      .then((response) => {
        const {access_token, athlete} = response

        addAccount(
          athlete["id"],
          athlete["username"],
          athlete["firstname"],
          athlete["lastname"],
          athlete["bio"],
          athlete["city"],
          athlete["state"],
          athlete["country"],
          athlete["sex"],
          athlete["summit"],
          athlete["created_at"],
          athlete["updated_at"],
          athlete["badge_type_id"],
          athlete["weight"],
          athlete["profile_medium"],
          athlete["profile"],
          athlete["friend"],
          athlete["follower"],
          dbRepository,
        )

        const cachingOptions = {
          key: `access_token:${athlete["id"]}`,
          expireTimeSec: 86400,
          data: access_token
        };
        // cache the result to redis
        cachingRepository.setCache(cachingOptions);

        getActivity(1,100,access_token,dbActivityRepository)

        return res.json({ athleteId: athlete["id"], accessToken: access_token });
      })
      .catch((error) => next(error));
  };

  const deAuthorize = async (req, res, next) => {
    var {athleteid, authorization} = req.headers;
    authorization = authorization?.split(' ')[1];

    await deauthorize(authorization)
      .then((response) => {
        cachingRepository.delCache(athleteid)

        return res.json({ message: 'Successfully deauthorized and logged out' });
      })
      .catch((error) => next(error));
  };

  return {
    fetchCallback,
    deAuthorize
  };
}
