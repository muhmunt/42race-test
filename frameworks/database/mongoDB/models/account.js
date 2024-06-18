import mongoose from 'mongoose';

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;
const AccountSchema = new Schema({
  strava_id: { type: Number, required: true, unique: true },
  username: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  bio: { type: String, default: null },
  city: { type: String, default: null },
  state: { type: String, default: null },
  country: { type: String, default: null },
  sex: { type: String, required: true },
  summit: { type: Boolean, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  badge_type_id: { type: Number, default: null },
  weight: { type: Number, default: null },
  profile_medium: { type: String, default: null },
  profile: { type: String, default: null },
  friend: { type: mongoose.Schema.Types.Mixed, default: null },
  follower: { type: mongoose.Schema.Types.Mixed, default: null }
});

AccountSchema.index({ role: 1 });

const AccountModel = mongoose.model('Account', AccountSchema);

AccountModel.ensureIndexes((err) => {
  if (err) {
    return err;
  }
  return true;
});

export default AccountModel;
