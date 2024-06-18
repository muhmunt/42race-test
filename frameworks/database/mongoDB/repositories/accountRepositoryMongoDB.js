import AccountModel from '../models/account';

function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
}

export default function accountRepositoryMongoDB() {
  const findByProperty = (params) =>
  AccountModel.find(omit(params, 'page', 'perPage'))
    .skip(params.perPage * params.page - params.perPage)
    .limit(params.perPage);

  const findAll = (params) =>
    AccountModel.find(omit(params, 'page', 'perPage'))
      .skip(params.perPage * params.page - params.perPage)
      .limit(params.perPage);

  const countAll = (params) =>
    AccountModel.countDocuments(omit(params, 'page', 'perPage'));

  const findById = (id) => AccountModel.findById(id);

  const add = (accountEntity) => {
    const newAccount = new AccountModel({
      strava_id: accountEntity.getStravaId(),
      username: accountEntity.getUsername(),
      firstname: accountEntity.getFirstname(),
      lastname: accountEntity.getLastname(),
      bio: accountEntity.getBio(),
      city: accountEntity.getCity(),
      state: accountEntity.getState(),
      country: accountEntity.getCountry(),
      sex: accountEntity.getSex(),
      summit: accountEntity.getSummit(),
      created_at: accountEntity.getCreatedAt(),
      updated_at: accountEntity.getUpdatedAt(),
      badge_type_id: accountEntity.getBadgeTypeId(),
      weight: accountEntity.getWeight(),
      profile_medium: accountEntity.getProfileMedium(),
      profile: accountEntity.getProfile(),
      friend: accountEntity.getFriend(),
      follower: accountEntity.getFollower()

    });

    return newAccount.save();
  };

  const updateById = (id, accountEntity) => {
    const updatedAccount = {
      title: accountEntity.getTitle(),
      description: accountEntity.getDescription(),
      isPublished: accountEntity.isPublished()
    };

    return AccountModel.findOneAndUpdate(
      { _id: id },
      { $set: updatedAccount },
      { new: true }
    );
  };

  const deleteById = (id) => AccountModel.findByIdAndRemove(id);

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
