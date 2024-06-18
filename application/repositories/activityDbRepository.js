export default function activityRepository(repository) {
  const findAll = (params) => repository.findAll(params);
  const countAll = (params) => repository.countAll(params);
  const findById = (id) => repository.findById(id);
  const add = (activity) => repository.add(activity);
  const updateById = (id, activity) => repository.updateById(id, activity);
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
