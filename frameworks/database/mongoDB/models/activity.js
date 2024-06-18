import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ActivitySchema = new Schema({
  resource_state: { type: Number, required: true },
  athlete: { type: Schema.Types.Mixed, default: null }, // Allowing athlete to be null or an object
  name: { type: String, required: true },
  distance: { type: Number, default: null },
  moving_time: { type: Number, default: null },
  elapsed_time: { type: Number, required: true },
  total_elevation_gain: { type: Number, default: null },
  type: { type: String, required: true },
  sport_type: { type: String, required: true },
  workout_type: { type: String, default: null },
  activity_id: { type: Number, required: true },
  external_id: { type: String, default: null },
  upload_id: { type: Number, default: null },
  start_date: { type: Date, required: true },
  start_date_local: { type: Date, required: true },
  timezone: { type: String, required: true },
  utc_offset: { type: Number, required: true },
  start_latlng: { type: [Number], default: null }, // Array of numbers or null
  end_latlng: { type: [Number], default: null }, // Array of numbers or null
  location_city: { type: String, default: null },
  location_state: { type: String, default: null },
  location_country: { type: String, default: null },
  achievement_count: { type: Number, default: null },
  kudos_count: { type: Number, default: null },
  comment_count: { type: Number, default: null },
  athlete_count: { type: Number, default: null },
  photo_count: { type: Number, default: null },
  map: { type: Schema.Types.Mixed, default: null }, // Allowing map to be null or an object
  trainer: { type: Boolean, required: true },
  commute: { type: Boolean, required: true },
  manual: { type: Boolean, required: true },
  private: { type: Boolean, required: true },
  flagged: { type: Boolean, required: true },
  gear_id: { type: String, default: null },
  from_accepted_tag: { type: Boolean, required: true },
  average_speed: { type: Number, default: null },
  max_speed: { type: Number, default: null },
  average_cadence: { type: Number, default: null },
  average_watts: { type: Number, default: null },
  weighted_average_watts: { type: Number, default: null },
  kilojoules: { type: Number, default: null },
  device_watts: { type: Boolean, default: null },
  has_heartrate: { type: Boolean, default: null },
  average_heartrate: { type: Number, default: null },
  max_heartrate: { type: Number, default: null },
  max_watts: { type: Number, default: null },
  pr_count: { type: Number, default: null },
  total_photo_count: { type: Number, default: null },
  has_kudoed: { type: Boolean, default: null },
  suffer_score: { type: Number, default: null }
});

ActivitySchema.index({ role: 1 });

const ActivityModel = mongoose.model('Activity', ActivitySchema);

ActivityModel.ensureIndexes((err) => {
  if (err) {
    return err;
  }
  return true;
});

export default ActivityModel;
