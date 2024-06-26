export default function account(
  strava_id, 
  username, 
  firstname, 
  lastname, 
  bio, 
  city, 
  state, 
  country, 
  sex, 
  summit, 
  created_at, 
  updated_at, 
  badge_type_id, 
  weight, 
  profile_medium, 
  profile, 
  friend, 
  follower
) {
  return {
    getStravaId: () => strava_id,
    getUsername: () => username,
    getFirstname: () => firstname,
    getLastname: () => lastname,
    getBio: () => bio,
    getCity: () => city,
    getState: () => state,
    getCountry: () => country,
    getSex: () => sex,
    getSummit: () => summit,
    getCreatedAt: () => created_at,
    getUpdatedAt: () => updated_at,
    getBadgeTypeId: () => badge_type_id,
    getWeight: () => weight,
    getProfileMedium: () => profile_medium,
    getProfile: () => profile,
    getFriend: () => friend,
    getFollower: () => follower
  };
}