const router = require('express').Router();
const {
  getAllcomment,
  getcommenttById,  
  createcomment,
  updatecommentById,
  deletecommentById,
  createReaction,
  deleteReaction,
  getAllComment
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