const { Comment, User } = require('../models');

const CommentController = {
//get all comments
getAllComment(req, res) {
   Comment.find({})
   .select('-__v')
   .sort({ _id: -1 })
   .then(dbCommentData => res.json(dbCommentData))
   .catch(err => {
     console.log(err);
     res.sendStatus(400);
   });
},

//get single comment by id
getCommentById({ params }, res) {
    Comment.findOne({ _id: params.CommentId })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(dbCommentData => {
        if (!dbCommentData) {
          res.status(404).json({ message: 'No Comment found with this id!' });
          return;
        }
        res.json(dbCommentData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },


//create new Comment
createComment({ params, body }, res) {
    console.log(body);
    Comment.create(body)
      .then(({ _id }) => {
        console.log (body)
        return User.findOneAndUpdate(
          { _id: body.username },
          { $push: { Comment: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No comment found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },


//update thought by Id
updateCommentById({ params, body }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $set: body },
      { new: true, runValidators: true }
    )
      .then(dbCommentData => {
        if (!dbCommentData) {
          res.status(404).json({ message: 'No comment found with this id!' });
          return;
        }
        res.json(dbCommentData);
      })
      .catch(err => res.status(400).json(err));
  },

//delete comment by Id
deleteCommentById({ params }, res) {
    Comment.findOneAndDelete(
        { _id: params.commentId })
      .then(deletedComment => {
        if (!deletedComment) {
          return res.status(404).json({ message: 'Your Comment has been deleted!' });
        }
        return User.findOneAndUpdate(
            { comment: params.commentId },
            { $pull: { comment: params.commentId } },
            { new: true }
          );
        })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
  
//create reaction stored in a single comment array field
createReaction(req, res) {
  Thought.findOneAndUpdate(
    {_id: req.params.commentId},
    {$push: {reactions: req.body}},
    {new: true, runValidators: true}
  )
  .then(dbReactionData => {
    if(!dbReactionData){
      res.status(404).json({ message: 'No reaction found'});
      return;
    }
    res.json(dbReactionData);
  })
  .catch(err => res.json(err));
},


//delete reaction by reactions Id
deleteReaction(req, res) {
  Comment.findOneAndUpdate(
    {_id: req.params.commentId},
    {$pull: {reactions: {reactionId: req.params.reactionId}}},
    {new: true}
  )
  .then(dbReactionData => {
    if(!dbReactionData){
      res.status(404).json({ message: 'No reaction found'});
      return;
    }
    res.json(dbReactionData);
  })
  .catch(err => res.json(err));
}
};

module.exports = CommentController;