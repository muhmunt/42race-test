import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export default async function getAthlete(accessToken) {
  try {
    const athletesResponse = await axios.get('https://www.strava.com/api/v3/athlete', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

    return athletesResponse.data
  } catch (error) {
    console.error('Error response from Strava:', error.response ? error.response.data : error.message);
    return error
    res.status(500).json({ error: error.response ? error.response.data : error.message });
  }
}
