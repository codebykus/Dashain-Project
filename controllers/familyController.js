const User=require("./../models/User")
const addFamilyMember=async function (req,res) {
    
  try {
    const { userId: familyMemberId } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.familyMembers.includes(familyMemberId)) {
      return res.status(400).json({ message: "Family member already added" });
    }

    user.familyMembers.push(familyMemberId);
    await user.save();
    const familyMember = await User.findById(familyMemberId);
    if (familyMember && !familyMember.familyMembers.includes(user._id)) {
      familyMember.familyMembers.push(user._id);
      await familyMember.save();
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getFamilyMember = async (req, res) => {
  const currentUserId = req.user._id;
  const myInfo = await User.findOne({ _id: currentUserId }).populate(
    "familyMembers",
    "name email profilePicture"
  );
  res.status(200).json({
    data: myInfo,
  });

};
module.exports={
    addFamilyMember,
    getFamilyMember,
}