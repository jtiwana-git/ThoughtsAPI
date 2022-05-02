const { User, Thought } = require ('../models');

// FRIENDCOUNT
const friendCount = async () =>
  User.aggregate()
    .count('friendCount')
    .then((numberOfFriends) => numberOfFriends);


const userContollers = {
    // ALL USERS
    getUsers(req, res) {
        User.find()
          .then(async (User) => {
            const friendObj = {
              User,
              headCount: await friendCount(),
            };
            return res.json(friendObj);
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },

   // GET SINGLE USER (BY ID) & POPULATED THOUGHT & FRIEND DATA
   getSingleUserAndPopulated({ params }, res) {
    User.findOne({ _id: params.id })
        .populate('Thought')
        .populate('friends')
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
},


    //   GET SINGLE USER
getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
    .select()
          .then((user) =>
           !user
    ? res.status(404).json({ message: 'No user with that ID' })
    : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
 },

//  CREATE USER
getCreateUser(req, res) {
    User.create(
        {
            username: req.body.username,
            email: req.body.email 
        })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

//   UPDATE USER
  getUpdateUser(req, res) {
    User.findOneAndUpdate ({_id: req.params._id})
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

//  DELETE USER & THEIR THOUGHTS
    getDeleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params._Id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thought.findOneAndUpdate(
              { thoughts: req.params._Id },
              { $pull: { thoughts: req.params._Id } },
              { new: true }
            )
      )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({
              message: 'User deleted, but no thoughts found',
            })
          : res.json({ message: 'User and thoughts successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },


}

module.exports =  userContollers;