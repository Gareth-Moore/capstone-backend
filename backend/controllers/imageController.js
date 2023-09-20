import asyncHandler from "express-async-handler";
import Image from "../models/imageModel.js";

// description:   Get image by userId
// method:        GET
// route:         /api/image
// access:        Private
const getImages = asyncHandler(async (req, res) => {
  const id = req.query.userId;
  try {
    const images = await Image.findOne({ userId: id });
    return res.status(200).json(images);
  } catch (error) {
    return res.status(404).json({ message: "No images found" });
  }
});

// description:   Upload image
// method:        POST
// route:         /api/image
// access:        Private
const uploadImage = asyncHandler(async (req, res) => {
  const body = req.body;
  if (body) {
    try {
      await Image.create({ myFile: body.myFile, userId: body.userId });
      return res.status(201).json({ message: "Image uploaded" });
    } catch {
      return res.status(409).json({ message: "Image failed to upload" });
    }
  } else {
    return res.status(400).json({ message: "No image in request" });
  }
});

// description:   Upload image
// method:        POST
// route:         /api/image
// access:        Private
const updateImage = asyncHandler(async (req, res) => {
  const body = req.body;
  const image = await Image.findOne({ userId: body.userId });
  if (image) {
    try {
      image.myFile = body.myFile;
      await image.save();
      return res.status(201).json({ message: "Image updated" });
    } catch {
      return res.status(409).json({ message: "Image failed to update" });
    }
  } else {
    try {
      await Image.create({ myFile: body.myFile, userId: body.userId });
      return res.status(201).json({ message: "Image uploaded" });
    } catch {
      return res.status(409).json({ message: "Image failed to upload" });
    }
  }
});

export { uploadImage, getImages, updateImage };
