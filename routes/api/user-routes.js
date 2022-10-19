const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  createFriend,
  deleteFriendById
} = require('../../controllers/user-controller');

// /users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// user ID routes
router
.route('/:id')
.get(getUserById)
.put(updateUserById)
.delete(deleteUserById);

//friends routes
router
 .route('/:userId/friends/:friendId')
 .post(createFriend)
 .delete(deleteFriendById);

module.exports = router;