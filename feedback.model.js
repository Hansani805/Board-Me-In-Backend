const mongoose=require('mongoose');
const Schema = mongoose.Schema;


let Feedback = new Schema({
    feedback_guestid:{
        type:String

    },

    feedback_guestname:{
        type:String

    },

    feedback_emailaddress:{
        type:String

    },
    feedback_telephonenumber:{
        type:Number

    },

    feedback_priority:{
        type:String

    },

    feedback_typeid:{
        type:String

    },

    feedback_comment:{
        type:String

    },

    feedback_completed:{
        type:Boolean

    }

});

module.exports=mongoose.model('Feedback',Feedback);