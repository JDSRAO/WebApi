var jwt = require('jsonwebtoken');
var authConfig = require('../config/appConfig');
function verifyToken(req, res, next) 
{
  var token = req.headers['authorization'];
  if (!token)
  {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }
  
  jwt.verify(token, authConfig.auth.secret, function(err, decoded) {
    if (err)
    {
      return res.status(500).send({ auth: false, message: 'Error occurred please contact admin ' });
    }
    // if everything good, save to request for use in other routes
    req.token = decoded.id;
    next();
  });
}
module.exports = verifyToken;