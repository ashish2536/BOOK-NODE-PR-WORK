const mongoose=require('mongoose');
const imagepath = "/uploads";
const path = require('path');
const multer = require('multer');


const EmpSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type : String,
        required : true
    },
    price:{
        type : Number,
        required : true
    },
    oprice:{
        type : Number,
        required: true
    },
    type:{
        type:String,
        required : true
    },
    hobby:{
        type: Array,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    image:{
        type : String,
        required : true
    }

})

const storageData = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null , path.join(__dirname , '..' , imagepath));
    },
    function :  function(req , file , cb){
        cb(null , file.fieldname + '-' + Date.now());
    } 
})  

EmpSchema.statics.image = imagepath;
EmpSchema.statics.uploadImage = multer({storage : storageData}).single('image');

const param = mongoose.model('param' , EmpSchema);
module.exports= param;