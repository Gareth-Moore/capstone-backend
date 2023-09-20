import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const commentsSchema = mongoose.Schema(
  {
    comments: [commentSchema],
    recipeId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentsSchema);

export default Comment;
