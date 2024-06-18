import findAll from '../../application/use_cases/account/findAll';
import findById from '../../application/use_cases/account/findById';
import countAll from '../../application/use_cases/account/countAll';

export default function accountController(
  accountDbRepository,
  accountDbRepositoryImpl
) {

  const dbRepository = accountDbRepository(accountDbRepositoryImpl());

    const fetchAllAccounts = (req, res, next) => {

    const params = {};
    const response = {};

    for (const key in req.query) {
      if (Object.prototype.hasOwnProperty.call(req.query, key)) {
        params[key] = req.query[key];
      }
    }
    params.page = params.page ? parseInt(params.page, 10) : 1;
    params.perPage = params.perPage ? parseInt(params.perPage, 10) : 10;

    findAll(params, dbRepository)
      .then((accounts) => {
        response.accounts = accounts;
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

  const fetchAccountById = (req, res, next) => {
    findById(req.params.id, dbRepository)
      .then((account) => {
        if (!account) {
          throw new Error(`No account found with id: ${req.params.id}`);
        }
        res.json(account);
      })
      .catch((error) => next(error));
  };

  return {
    fetchAllAccounts,
    fetchAccountById
  };
}
