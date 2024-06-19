import axios from 'axios';
import dotenv from 'dotenv';
import activity from '../../../src/entities/activity';
dotenv.config();

function getEpochTimestamp(date) {
  return Math.floor(date.getTime() / 1000);
}

async function fetchActivities(page, perPage, accessToken) {
  try {
    const now = new Date();
    const afterDate = new Date(now.getTime() - (3 * 24 * 60 * 60 * 1000));
    const beforeTimestamp = Math.floor(now.getTime() / 1000);
    const afterTimestamp = Math.floor(afterDate.getTime() / 1000);

    const response = await axios.get('https://www.strava.com/api/v3/athlete/activities', {
      params: {
        page: page,
        per_page: perPage,
        before: beforeTimestamp,
        after: afterTimestamp
      },
      headers: {
          'Authorization': `Bearer ${accessToken}`
      }
    });

    return response.data;
  } catch (error) {
    throw new Error(`Error fetching activities from Strava API: ${error.message}`);
  }
}


async function processActivity(activityData, activityDbRepository) {
  try {
    const {
      resource_state, athlete, name, distance, moving_time, elapsed_time,
      total_elevation_gain, type, sport_type, workout_type, id: activity_id,
      external_id, upload_id, start_date, start_date_local, timezone, utc_offset,
      start_latlng, end_latlng, location_city, location_state, location_country,
      achievement_count, kudos_count, comment_count, athlete_count, photo_count,
      map, trainer, commute, manual, flagged, gear_id, from_accepted_tag,
      average_speed, max_speed, average_cadence, average_watts, weighted_average_watts,
      kilojoules, device_watts, has_heartrate, average_heartrate, max_heartrate,
      max_watts, pr_count, total_photo_count, has_kudoed, suffer_score
    } = activityData;

    var _private = activityData["private"]

    if (!activity_id) {
      return;
    }

    const existingActivity = await activityDbRepository.findByProperty({ activity_id });
    if (existingActivity.length) {
      console.log(`Activity with id: ${activity_id} already exists`);
      return;
    }

    const newActivity = activity(
      resource_state, athlete, name, distance, moving_time, elapsed_time,
      total_elevation_gain, type, sport_type, workout_type, activity_id,
      external_id, upload_id, start_date, start_date_local, timezone, utc_offset,
      start_latlng, end_latlng, location_city, location_state, location_country,
      achievement_count, kudos_count, comment_count, athlete_count, photo_count,
      map, trainer, commute, manual, _private, flagged, gear_id, from_accepted_tag,
      average_speed, max_speed, average_cadence, average_watts, weighted_average_watts,
      kilojoules, device_watts, has_heartrate, average_heartrate, max_heartrate,
      max_watts, pr_count, total_photo_count, has_kudoed, suffer_score,
    );

    await activityDbRepository.add(newActivity);

  } catch (error) {
    console.error('Error processing activity:', error);
    throw new Error(`Error processing activity: ${error.message}`);
  }
}


export default async function getActivity(
page, perpage, access_token, activityDbRepository
) {
  try {
    const activitiesResponse = await fetchActivities(page, perpage, access_token);

    await Promise.all(activitiesResponse.map(activityData => processActivity(activityData, activityDbRepository)));

    return true;
  } catch (error) {
    console.error('Error response from Strava:', error.message);
    return false;
  }
}
