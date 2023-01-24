const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');

const userAuthentication = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader) {
    res.status(403).json({
      status: 'access denied',
      msg:
        "Oops! Something sure went wrong... You're likely not authenticated!",
    });
    return;
  }
  const bearer = bearerHeader.split(' ');
  const [tops, token] = bearer;
  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      res.status(401).json({
        status: 'access denied',
        msg: 'Oops! Your token might be expired...',
      });
      return;
    } else {
      req.user = decodedToken.user;
      return next();
    }
  });
  // req.token = bearer;
  // console.log(bearer[1]);
};

// const authorAuthorization = async (req, res, next) => {
//   const { author } = await Post.findById(req.params.id);
//   if (!req.user || req.user._id != author) {
//     res.status(200).json({
//       status: 'access denied',
//       message:
//         'Ooppss! Only the author of a twit is allowed to perform this action...',
//     });
//     return;
//   }
//   next();
// };

module.exports = { userAuthentication };
