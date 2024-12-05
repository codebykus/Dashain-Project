const User = require("../models/User");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const addFamilyMember = catchAsync(async (req, res, next) => {
  const { userId: familyMemberId } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  if (user.familyMembers.includes(familyMemberId)) {
    return next(new AppError("Family member already added", 400));
  }

  user.familyMembers.push(familyMemberId);
  await user.save();

  const familyMember = await User.findById(familyMemberId);
  if (familyMember && !familyMember.familyMembers.includes(user._id)) {
    familyMember.familyMembers.push(user._id);
    await familyMember.save();
  }

  res.json(user);
});

const getFamilyMember = catchAsync(async (req, res, next) => {
  const currentUserId = req.user._id;
  const myInfo = await User.findOne({ _id: currentUserId }).populate(
    "familyMembers",
    "name email profilePicture"
  );

  if (!myInfo) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    data: myInfo,
  });
});

module.exports = {
  addFamilyMember,
  getFamilyMember,
};
