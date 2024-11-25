// controllers/tikaController.js
const Tika = require('../models/Tika');
const User=require("../models/User")




//aDDING TIKA
const addTika=async(req,res)=>{
    try{
        const {receiverId,tikaMessage,blessings}=req.body;
        const senderId=req.user._id;
        const sender=await User.findById(senderId);
        const receiver=await User.findById(receiverId)
        if(!sender || !receiver){
            return res.status(404).json({message:"Sender or receiver not found"})
        }
        const newTika = new Tika({
            senderId,
            receiverId,
            tikaMessage,
            blessings,
            tikaDate: new Date(),
          });
      
          await newTika.save();
      
          res.status(201).json({
            message: "Tika sent successfully!",
            tika: newTika,
          });
        } catch (error) {
          res.status(500).json({ message: "Server error", error: error.message });
        }
      };


    // Get Tika 
    const getTika=async(req,res)=>{
        try{
            const userId=req.user._id;
            const tikaHistory=await Tika.find({
                $or:[{
                    senderId:userId
                },{receiverId:userId}],

            })
            .populate("senderId","name")
            .populate("receiverId","name")
            .sort({tikaDate:-1});
            res.status(200).json({
                message:"Tika history retrieved sucessfully",
                tikaHistory,

            });

        }
        catch(error){
            res.status(500).json({message:"Server error",error:error.message})
        }
    }   
      module.exports={
        addTika,getTika
      }
    