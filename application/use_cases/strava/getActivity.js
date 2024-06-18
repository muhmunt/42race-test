import axios from 'axios';
import dotenv from 'dotenv';
import activity from '../../../src/entities/activity';
dotenv.config();

// export default async function getActivity(
//   before,
//   after,
//   page,
//   perpage,
//   access_token,
//   activityDbRepository
// ) {

//   try {
//     const activitiesResponse = await axios.get(`https://www.strava.com/api/v3/athlete/activities?page=${page}&per_page=${perpage}`, {
//             headers: {
//                 'Authorization': `Bearer ${access_token}`
//             }
//         });
        

//       for (const activityData of activitiesResponse.data) {
//         try {
//           var resource_state = activityData["resource_state"];
//           var athlete = activityData["athlete"];
//           var name = activityData["name"];
//           var distance = activityData["distance"];
//           var moving_time = activityData["moving_time"];
//           var elapsed_time = activityData["elapsed_time"];
//           var total_elevation_gain = activityData["total_elevation_gain"];
//           var type = activityData["type"];
//           var sport_type = activityData["sport_type"];
//           var workout_type = activityData["workout_type"];
//           var activity_id = activityData["id"];
//           var external_id = activityData["external_id"];
//           var upload_id = activityData["upload_id"];
//           var start_date = activityData["start_date"];
//           var start_date_local = activityData["start_date_local"];
//           var timezone = activityData["timezone"];
//           var utc_offset = activityData["utc_offset"];
//           var start_latlng = activityData["start_latlng"];
//           var end_latlng = activityData["end_latlng"];
//           var location_city = activityData["location_city"];
//           var location_state = activityData["location_state"];
//           var location_country = activityData["location_country"];
//           var achievement_count = activityData["achievement_count"];
//           var kudos_count = activityData["kudos_count"];
//           var comment_count = activityData["comment_count"];
//           var athlete_count = activityData["athlete_count"];
//           var photo_count = activityData["photo_count"];
//           var map = activityData["map"];
//           var trainer = activityData["trainer"];
//           var commute = activityData["commute"];
//           var manual = activityData["manual"];
//           var _private = activityData["private"];
//           var flagged = activityData["flagged"];
//           var gear_id = activityData["gear_id"];
//           var from_accepted_tag = activityData["from_accepted_tag"];
//           var average_speed = activityData["average_speed"];
//           var max_speed = activityData["max_speed"];
//           var average_cadence = activityData["average_cadence"];
//           var average_watts = activityData["average_watts"];
//           var weighted_average_watts = activityData["weighted_average_watts"];
//           var kilojoules = activityData["kilojoules"];
//           var device_watts = activityData["device_watts"];
//           var has_heartrate = activityData["has_heartrate"];
//           var average_heartrate = activityData["average_heartrate"];
//           var max_heartrate = activityData["max_heartrate"];
//           var max_watts = activityData["max_watts"];
//           var pr_count = activityData["pr_count"];
//           var total_photo_count = activityData["total_photo_count"];
//           var has_kudoed = activityData["has_kudoed"];
//           var suffer_score = activityData["suffer_score"];

//           if (activity_id == null) {
//             continue
//           }

//           const newActivity = activity(
//             resource_state,
//             athlete,
//             name,
//             distance,
//             moving_time,
//             elapsed_time,
//             total_elevation_gain,
//             type,
//             sport_type,
//             workout_type,
//             activity_id,
//             external_id,
//             upload_id,
//             start_date,
//             start_date_local,
//             timezone,
//             utc_offset,
//             start_latlng,
//             end_latlng,
//             location_city,
//             location_state,
//             location_country,
//             achievement_count,
//             kudos_count,
//             comment_count,
//             athlete_count,
//             photo_count,
//             map,
//             trainer,
//             commute,
//             manual,
//             _private,
//             flagged,
//             gear_id,
//             from_accepted_tag,
//             average_speed,
//             max_speed,
//             average_cadence,
//             average_watts,
//             weighted_average_watts,
//             kilojoules,
//             device_watts,
//             has_heartrate,
//             average_heartrate,
//             max_heartrate,
//             max_watts,
//             pr_count,
//             total_photo_count,
//             has_kudoed,
//             suffer_score,
//           )

//         activityDbRepository
//         .findByProperty({ activity_id })
//         .then(async (activity) => {
//           if (activity.length) {
//             console.log(`Activity with id: ${activity_id} already exists`);
//             return 
//           }
//           await activityDbRepository.add(newActivity);
//         });
//         } catch (error) {
//           console.error(`Iteration Database operation failed`, error);
//         }
//     }
        

//     return true
//   } catch (error) {
//     console.error('Error response from Strava:', error.response ? error.response.data : error.message);
//     return error
//   }
// }

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
