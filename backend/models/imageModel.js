import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
  myFile: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Image = mongoose.model("Image", imageSchema);

export default Image;
