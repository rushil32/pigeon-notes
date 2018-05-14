const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const config = require('../config');

const CLIENT_ID = '460346450717-0u34rlrkph28bgrl6at9p0747e2qfoir.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

const userCtrl = require('./userController');

async function verifyUser(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const userId = payload.sub;
  const firstName = payload.given_name;
  const lastName = payload.family_name;
  const image = payload.picture;
  const { email } = payload;

  const user = await userCtrl.createUser({
    userId,
    email,
    firstName,
    lastName,
    image,
  });

  return user;
}

exports.verifyToken = (token) => {
  if (!token) return false;

  try {
    const decoded = jwt.verify(token, config.tokenSecret);
    return decoded.id;
  } catch (err) {
    return false;
  }
};

exports.authenticate = (req, res) => {
  const { idtoken } = req.body;
  const TWO_DAYS = 86400 * 2;

  verifyUser(idtoken)
    .then((user) => {
      const token = jwt.sign({ id: user._id }, config.tokenSecret, {
        expiresIn: TWO_DAYS,
      });
      res.status(200).send({
        auth: true,
        token,
        user,
      });
    })
    .catch(console.error);
};
