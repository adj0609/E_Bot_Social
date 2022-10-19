const router = require('express').Router();
const {
  getAllComment,
  getCommentById,  
  createComment,
  updateCommentById,
  deleteCommentById,
  createReaction,
  deleteReaction,
} = require('../../controllers/comment-controller');

// /apicomment
router
.route('/')
.get(getAllComment)
.post(createComment);

//api/thoughts/:commentId
router
.route('/:commentId')
.get(getCommentById)
.put(updateCommentById)
.delete(deleteCommentById);

//comment and reaction
router.
route('/:CommentId/reactions/:reactionId')
.post(createReaction)
.delete(deleteReaction);

module.exports = router;