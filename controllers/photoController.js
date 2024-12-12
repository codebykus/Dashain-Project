const Photo = require("../models/Photo");
const User = require("../models/User");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const photoController = {
  uploadPhoto: catchAsync(async (req, res, next) => {
    if (!req.file) {
      return next(new AppError("No file uploaded", 400));
    }
    console.log(req.file);

    // Create file URL
    const fileUrl = `/uploads/${req.file.filename}`;
    console.log(fileUrl);

    const photo = new Photo({
      userId: req.user.userId,
      imageUrl: fileUrl,
      description: req.body.description || "",
    });

    await photo.save();
    res.status(201).json({
      status: "success",
      message: "Photo uploaded successfully",
      photo,
    });
  }),

  getSharedPhotos: catchAsync(async (req, res, next) => {
    const currentUser = await User.findById(req.user.userId);
    if (!currentUser) {
      return next(new AppError("User not found", 404));
    }

    const photos = await Photo.find({
      userId: { $in: [...currentUser.familyMembers, req.user.userId] },
    })
      .populate("userId", "name email profilePicture")
      .populate("likes", "name profilePicture")
      .sort("-createdAt");

    res.status(200).json({
      status: "success",
      message: "Shared photos retrieved successfully",
      photos,
    });
  }),

  getPhotos: catchAsync(async (req, res, next) => {
    const photos = await Photo.find({ userId: req.user.userId }).sort(
      "-createdAt"
    );
    res.status(200).json({
      status: "success",
      message: "Photos retrieved successfully",
      photos,
    });
  }),
};

module.exports = photoController;
