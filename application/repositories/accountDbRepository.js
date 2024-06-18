export default function accountRepository(repository) {
  const findAll = (params) => repository.findAll(params);
  const countAll = (params) => repository.countAll(params);
  const findById = (id) => repository.findById(id);
  const add = (account) => repository.add(account);
  const updateById = (id, account) => repository.updateById(id, account);
  const deleteById = (id) => repository.deleteById(id);
  const findByProperty = (params) => repository.findByProperty(params);

  return {
    findAll,
    countAll,
    findById,
    add,
    updateById,
    deleteById,
    findByProperty
  };
}
