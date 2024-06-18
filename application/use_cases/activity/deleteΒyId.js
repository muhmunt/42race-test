export default function deleteById(id, activityRepository) {
  return activityRepository.findById(id).then((activity) => {
    if (!activity) {
      throw new Error(`No activity found with id: ${id}`);
    }
    return activityRepository.deleteById(id);
  });
}
