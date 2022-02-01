const jwt = require('jsonwebtoken');
const { accessTokenSecret } = require('../../config/index');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.sendStatus(401);
  }
  // We expect the authorization header value to be in format Bearer <token>
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.userId = user.userId ?? user.user;
    next();
  });
}

module.exports = {
  authenticateToken,
};