export default function sessionMiddleware(req, res, next) {
  if (req.session && req.session.access_token) {
    next();
  } else {
      res.status(401).send('Unauthorized: No access token');
  }

}
