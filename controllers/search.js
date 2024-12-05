const eventSchema = require("../model/eventSchema");
const userSchema = require("../model/userSchema");
const catchAsync = require("../utils/catchAsync");

const search = catchAsync(async (req, res, next) => {
  const { email, title } = req.query;

  if (email) {
    const users = await userSchema
      .find({
        email: { $regex: email, $options: "i" },
        _id: { $ne: req.user._id },
      })
      .select("name email profilePicture");

    return res.json({ users });
  }

  if (title) {
    const events = await eventSchema
      .find({
        title: { $regex: title, $options: "i" },
      })
      .select("title description date");

    return res.json({ events });
  }

  res.status(400).json({ msg: "Provide a valid search term" });
});

module.exports = search;
