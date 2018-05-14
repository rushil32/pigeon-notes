const authCtrl = require('./authController');
const User = require('../models/User');

exports.createUser = ({ userId, email, firstName, lastName, image }) => (
  new Promise((resolve, reject) => {
    User
      .findOne({ googleId: userId })
      .populate('notes')
      .exec((err, user) => {
        if (err) { reject(err); return; }
        if (user) { resolve(user); return; }

        const newUser = new User({
          googleId: userId,
          email,
          firstName,
          lastName,
          image,
        });

        newUser.save();
      });
  })
);

exports.getUser = id => (
  new Promise((resolve, reject) => {
    User
      .findOne({ _id: id })
      .populate('notes')
      .exec((err, user) => {
        resolve(user);
      });
  })
);

exports.addNote = (userId, noteId) => (
  new Promise((resolve, reject) => {
    User.findOne({ _id: userId }, (err, user) => {
      user.notes.push(noteId);
      user.save();
      resolve(user);
    });
  })
);

exports.getData = (req, res) => {
  const { token } = req.cookies;
  const userId = authCtrl.verifyToken(token);

  if (!userId) {
    res.status(403).send('Unauthorized user');
    return;
  }

  this.getUser(userId).then(user => res.send({ user }));
};
