const { User } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find()
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },


    //get user by Id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
         .populate({
            path: 'friends',
            select: '-__v'
         }) 
        .populate({
            path: 'comment',
            select: '-__v'
          })
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


    // create new user
    createUser({ body }, res) {
        User.create(body)
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
      },

    // update user by Id
    updateUserById({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.status(400).json(err));
      },

    // delete user by id
    deleteUserById({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.status(400).json(err));
      },

    // add friend 
    createFriend(req, res) {
      User.findOneAndUpdate (
        {_id: req.params.userId},
        {$addToSet: {friends: req.params.friendId}},
        {new: true}
      )
      .then(dbUserData => {
        if(!dbUserData) {
          res.status(404).json ({message: 'No user found with this id!'});
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
    },


    // remove friend from friends list
    deleteFriendById(req, res) {
      User.findByIdAndUpdate(
        {_id: req.params.userId},
        {$pull: {friends: req.params.friendId}},
        {new: true}
      )
      .then(dbUserData => {
        if(!dbUserData) {
          res.status(404).json ({message: 'No user found with this id'});
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;