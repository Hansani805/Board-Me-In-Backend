const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const  cors = require('cors');
const mongoose = require('mongoose');
const feedbackRoutes = express.Router();
const PORT=4000;


let Feedback=require('./feedback.model');
const feedbackModel = require('./feedback.model');

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost/feedbackdb',{useNewUrlParser:true,useUnifiedTopology:true});
const connection = mongoose.connection;

connection.once('open',function(){
    console.log("MongoDB database connection established successfully");
})

feedbackRoutes.route('/').get(function(req,res){
    Feedback.find(function(err,feedback){
        if(err){
           console.log(err);
        }else{
            res.json(feedback);
        }
     });
});

feedbackRoutes.route('/:id').get(function(req,res){
    let id=req.params.id;
    Feedback.findById(id,function(err,feedback){
        res.json(feedback);

    
    });
 });
 
 feedbackRoutes.route('/add').post(function(req,res) {
     let feedback=new Feedback(req.body);
      feedback.save()
      .then(feedback =>{
          res.status(200).json({'feedback':'feedback added sucessuly'});


      })
      .catch(err=>{
          res.status(400).send('adding new feedback failed')
       });
});


feedbackRoutes.route('/update/:id').post(function(req,res){
    Feedback.findById(req.params.id,function(err,feedback){
        if(!feedback)                                                                 
         res.status(404).send('data is not found');
        else
            feedback.feedback_guestid = req.body.feedback_guestid;
            feedback.feedback_guestname=req.body.feedback_guestname;
            feedback.feedback_emailaddress=req.body.feedback_emailaddress;
            feedback.feedback_telephonenumber=req.body.feedback_telephonenumber;
            feedback.feedback_date=req.body.feedback_date;
            feedback.feedback_priority=req.body.feedback_priority;
            feedback.feedback_comment=req.body.feedback_comment;
            feedback.feedback_completed=req.body.feedback_completed;

            feedback.save().then(feedback=>{
                res.json('Feedback updated');
            })
            .catch(err=>{
                res.status(400).send("Update not possible");
             });

            });
            


        });



app.use('/feedback',feedbackRoutes);


app.listen(PORT,function(){
   console.log('Server is running on Port:'+PORT);
});
