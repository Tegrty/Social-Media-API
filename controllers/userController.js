const { ObjectId } = require('mongoose').Types;
const { User, Thought, reactionSchema } = require('../models');

module.exports = {

// Get all users
  getUsers: (req, res) => {
    User.find({})
      .select('-__v')
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

// Get a single user by its _id and populated thought and friend data
  getSingleUser: (req, res) => {
    User.findOne({ _id: req.params.id })
      .populate([
        { path: 'thoughts', select: '-__v' },
        { path: 'friends', select: '-__v' },
      ])
      .select('-__v')
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

// Create a user
  createUser: (req, res) => {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

 // Update a user by its _id 
  updateUser: async (req, res, next) => {
    try {
      if (req.params.id !== req.user.id.toString()) {
        return res
          .status(401)
          .json({ message: 'You are not authorized to update this user!' });
      }

      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },

 // Delete a user by its _id 
  deleteUser: (req, res) => {
    User.findOneAndDelete({ _id: req.params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

 // Add a new friend to a user's friend list 
  addFriend: (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

 // Delete a friend from a user's friend list 
  deleteFriend: (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },
};
