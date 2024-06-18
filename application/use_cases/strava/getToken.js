import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export default async function getToken(code) {
  try {
    const response = await axios.post('https://www.strava.com/oauth/token', {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code'
    });

    // const { access_token } = response.data;

    return response.data
  } catch (error) {
    console.error('Error response from Strava:', error.response ? error.response.data : error.message);
    return error
    res.status(500).json({ error: error.response ? error.response.data : error.message });
  }
}
