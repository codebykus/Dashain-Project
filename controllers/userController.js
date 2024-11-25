const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUserDetails=async(req,res)=>{
  try{
    const userId=req.user._id;
    const user=await User.findById(userId).select("-password");
    if(!user){
      return res.status(404).json({
        message:"User not found"
      });
    }
    res.status(200).json(user);

  }catch(err){
    res.status(500).json({
      error:err.message
    })
  }
}
const editUserDetails=async(req,res)=>{
  try{
    const {name,profilePicture}=req.body;
    const userId=req.user._id;
    const user=await User.findById(userId);
    if (!user){
      return res.status(404).json({message:"User not found"});

    }
    if (name)user.name=name;
    if(req.file)[
      user.profilePicture=`/uploads/${req.file.filename}`
    ]
    await user.save();
    res.status(200).json({message:"User details updated sucessfully",user})
  }
  catch (error){
    res.status(500).json({message:"Sever error",error:error.message})
  }

}
   module.exports = { registerUser, loginUser, getUserDetails, editUserDetails};
