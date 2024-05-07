const ejs = require('ejs');
const express=require('express')

const port=12000;

var app=express();

const db=require('./config/mongoose')

var path=require('path');
app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'))
app.use('/uploads' , express.static(path.join(__dirname , 'uploads')));

app.use(express.urlencoded());

var record=[];
var person=require('./models/person');

app.get('/', async function(req,res){

    var emp_person =await person.find({})

    return res.render('home',{
        person:emp_person
    })
})

app.post('/insertHomeData',person.uploadImage, async function(req,res){
    console.log(req.body);
    console.log(req.file);
    var img = '';
    if(req.file)
    {
        img = person.image+ "/" +req.file.filename;
    }
    req.body.image = img;
    await person.create(req.body);
    return res.redirect('/');

    const data= await person.create(req.body);
    return res.redirect('/')
    
})

app.get('/daletRecord/:id',async (req,res)=>{

    let del= await person.findByIdAndDelete(req.params.id)
    if(del){
        return res.redirect('/')
    }
    else{
        console.log("something wrong");
        return res.redirect('/')
    }
    
})

app.get('/updateRecord',async function(req,res){

    const singleData= await person.findById(req.query.id)
    if(singleData){
        return res.render('update',{
            empData:singleData
        })
    }
    else{
        return res.redirect('/')
    }
})

app.post('/EditHomeData',async function(req,res){

    const updateDate= await person.findByIdAndUpdate(req.body.id,req.body)
    return res.redirect('/');
})

app.listen(port,async(err)=>{
    if(err){
        console.log("Somthing Wrong");
    }else{
        console.log("sarvar is running "+port)
    }
})