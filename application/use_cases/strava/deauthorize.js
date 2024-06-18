import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export default async function deauthorize(accessToken) {
  try {
    const response = await axios.post('https://www.strava.com/oauth/deauthorize', {}, {
      headers: {
          'Authorization': `Bearer ${accessToken}`
      }
  });

    return true
  } catch (error) {
    console.error('Error response from Strava:', error.response ? error.response.data : error.message);
    return error
    res.status(500).json({ error: error.response ? error.response.data : error.message });
  }
}
