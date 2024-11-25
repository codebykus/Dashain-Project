const multer = require("multer")
const path=require("path");
const fs=require("fs");

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        
        if(!fs.existsSync("uploads")){
            fs.mkdirSync("uploads")
        }
        cb (null,"uploads")
    },filename:function(req,file,cb){
        const uniqueSuffix=Date.now()+"-"+Math.round(Math.random()* 1e9);
        cb(null,uniqueSuffix+path.extname(file.originalname));

    },

});


const fileFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith("image/") || file.mimetype==="application/pdf"){
        cb(null,true);

    }else{
    cb(new Error("Not an image Please upload only images"),false);

    }
};
const upload=multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{
        filesize:10*1024*1024
    }
})
module.exports=upload;
