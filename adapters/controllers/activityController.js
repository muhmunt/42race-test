import findAll from '../../application/use_cases/activity/findAll';
import findById from '../../application/use_cases/activity/findById';
import deleteActivityById from '../../application/use_cases/activity/deleteΒyId';
import countAll from '../../application/use_cases/activity/countAll';

export default function activityController(
  activityDbRepository,
  activityDbRepositoryImpl
) {

  const dbRepository = activityDbRepository(activityDbRepositoryImpl());

    const fetchAllActivity = (req, res, next) => {

    const params = {};
    const response = {};

    for (const key in req.query) {
      if (Object.prototype.hasOwnProperty.call(req.query, key)) {
        params[key] = req.query[key];
      }
    }
    params.page = params.page ? parseInt(params.page, 10) : 1;
    params.perPage = params.perPage ? parseInt(params.perPage, 10) : 10;
    params.athlete = params.athlete ? parseInt(params.athlete) : "";
    params.type = params.type ? params.type : "";

    findAll(params, dbRepository)
      .then((activity) => {
        response.activity = activity;
        return countAll(params, dbRepository);
      })
      .then((totalItems) => {
        response.totalItems = totalItems;
        response.totalPages = Math.ceil(totalItems / params.perPage);
        response.itemsPerPage = params.perPage;
        return res.json(response);
      })
      .catch((error) => next(error));
  };

  const fetchActivityById = (req, res, next) => {
    findById(req.params.id, dbRepository)
      .then((activity) => {
        if (!activity) {
          throw new Error(`No activity found with id: ${req.params.id}`);
        }
        res.json(activity);
      })
      .catch((error) => next(error));
  };

  const deleteById = (req, res, next) => {
    deleteActivityById(req.params.id, dbRepository)
      .then(() => res.json('post sucessfully deleted!'))
      .catch((error) => next(error));
  };

  
  return {
    fetchAllActivity,
    fetchActivityById,
    deleteById
  };
}
