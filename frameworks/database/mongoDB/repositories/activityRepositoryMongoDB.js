import ActivityModel from '../models/activity';

function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
}

export default function activityRepositoryMongoDB() {
  const findByProperty = (params) =>
  ActivityModel.find(omit(params, 'page', 'perPage'))
    .skip(params.perPage * params.page - params.perPage)
    .limit(params.perPage);

    const findAll = (params) => {
      let query = ActivityModel.find(omit(params, 'page', 'perPage', 'type', 'athlete'));
    
      if (params.type) {
        query = query.where('type').equals(params.type);
      }
    
      if (params.athlete) {
        query = query.where('athlete.id').equals(params.athlete);
      }
        
      return query
        .skip(params.perPage * params.page - params.perPage)
        .limit(params.perPage);
    };
    

  const countAll = (params) =>
    ActivityModel.countDocuments(omit(params, 'page', 'perPage'));

  const findById = (id) => ActivityModel.findById(id);

  const add = async (activityEntity) => {
    const newActivity = new ActivityModel({
        resource_state: activityEntity.getResourceState(),
        athlete:activityEntity.getAthlete(),
        name: activityEntity.getName(),
        distance: activityEntity.getDistance(),
        moving_time: activityEntity.getMovingTime(),
        elapsed_time: activityEntity.getElapsedTime(),
        total_elevation_gain: activityEntity.getTotalElevationGain(),
        type: activityEntity.getType(),
        sport_type: activityEntity.getSportType(),
        workout_type: activityEntity.getWorkoutType(),
        activity_id: activityEntity.getActivityId(),
        external_id: activityEntity.getExternalId(),
        upload_id: activityEntity.getUploadId(),
        start_date: activityEntity.getStartDate(),
        start_date_local: activityEntity.getStartDateLocal(),
        timezone: activityEntity.getTimezone(),
        utc_offset: activityEntity.getUtcOffset(),
        start_latlng: activityEntity.getStartLatlng(),
        end_latlng: activityEntity.getEndLatlng(),
        location_city: activityEntity.getLocationCity(),
        location_state: activityEntity.getLocationState(),
        location_country: activityEntity.getLocationCountry(),
        achievement_count: activityEntity.getAchievementCount(),
        kudos_count: activityEntity.getKudosCount(),
        comment_count: activityEntity.getCommentCount(),
        athlete_count: activityEntity.getAthleteCount(),
        photo_count: activityEntity.getPhotoCount(),
        map: activityEntity.getMap(),
        trainer: activityEntity.isTrainer(),
        commute: activityEntity.isCommute(),
        manual: activityEntity.isManual(),
        private: activityEntity.isPrivate(),
        flagged: activityEntity.isFlagged(),
        gear_id: activityEntity.getGearId(),
        from_accepted_tag: activityEntity.isFromAcceptedTag(),
        average_speed: activityEntity.getAverageSpeed(),
        max_speed: activityEntity.getMaxSpeed(),
        average_cadence: activityEntity.getAverageCadence(),
        average_watts: activityEntity.getAverageWatts(),
        weighted_average_watts: activityEntity.getWeightedAverageWatts(),
        kilojoules: activityEntity.getKilojoules(),
        device_watts: activityEntity.isDeviceWatts(),
        has_heartrate: activityEntity.hasHeartrate(),
        average_heartrate: activityEntity.getAverageHeartrate(),
        max_heartrate: activityEntity.getMaxHeartrate(),
        max_watts: activityEntity.getMaxWatts(),
        pr_count: activityEntity.getPrCount(),
        total_photo_count: activityEntity.getTotalPhotoCount(),
        has_kudoed: activityEntity.hasKudoed(),
        suffer_score: activityEntity.getSufferScore()
    });

    return await newActivity.save(activityEntity);
  };


  const updateById = (id, activityEntity) => {
    const updatedActivity = {
      title: activityEntity.getTitle(),
      description: activityEntity.getDescription(),
      isPublished: activityEntity.isPublished()
    };

    return ActivityModel.findOneAndUpdate(
      { _id: id },
      { $set: updatedActivity },
      { new: true }
    );
  };

  const deleteById = (id) => ActivityModel.findByIdAndRemove(id);

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
