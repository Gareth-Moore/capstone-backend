import asyncHandler from "express-async-handler";
import { simulateError } from "../utils/errorUtils.js";
import Comment from "../models/commentModel.js";

// description:   Get comments for recipe
// method:        GET
// route:         /api/comments
// access:        Private
const getUserComments = asyncHandler(async (req, res) => {
  const { recipeId } = req.query;

  const getComment = await Comment.findOne({ recipeId });

  if (getComment) {
    res.status(200).json({ comments: getComment.comments });
  } else {
    res.status(404).json({ message: "No comments found" });
  }
});

// description:   Add a users comment
// method:        POST
// route:         /api/comments
// access:        Private
const addUserComment = asyncHandler(async (req, res) => {
  const { recipeId, comment, userId, userName } = req.query;
  if (!recipeId && !comment && !userId && !userName) {
    res.status(400).json({ message: "Not all parameters are included" });
  }

  const recipeComments = await Comment.findOne({ recipeId });

  if (recipeComments) {
    recipeComments.comments.push({ userId, userName, comment });
    const updatedComments = await recipeComments.save();
    res.status(200).json(updatedComments);
  } else {
    const updateComments = await Comment.create({
      recipeId: recipeId,
      comments: {
        userId,
        userName,
        comment,
      },
    });
    res.status(200).json(updateComments);
  }
});

// description:   Delete a users comment
// method:        DELETE
// route:         /api/comments
// access:        Private
const deleteUserComment = asyncHandler(async (req, res) => {
  const { recipeId, comment: userComment, userId } = req.body;

  const serverComment = await Comment.findOne({ recipeId });

  if (serverComment) {
    try {
      serverComment.comments = serverComment.comments.filter(
        (comment) =>
          comment.userId !== userId || userComment !== comment.comment
      );

      const updatedComments = await serverComment.save();

      res.status(200).json({ updatedComments });
    } catch (error) {
      res.status(404).json({ message: "Comment not deleted" });
    }
  } else {
    res.status(404).json({ message: "No comments found" });
  }
});

export { getUserComments, addUserComment, deleteUserComment };
