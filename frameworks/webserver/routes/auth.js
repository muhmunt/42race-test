import dotenv from 'dotenv';
dotenv.config();

export default function authRouter(express) {
  const router = express.Router();

  // POST enpdpoints
  router.route('/strava').get((req, res) => {
    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}&scope=read,activity:read_all,activity:write`;
    res.redirect(authUrl);
  })

  return router;
}
