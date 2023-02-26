const mongoose = require('mongoose');
const User = require('./user');
const habitSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:false
    },

    count:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    fav:{
        type:Boolean,
        default:false
    },
    dates:[
        {
            date:String,
            complete:String,
            day:String
        }
    ]

},{
    timestamps:true
});
const Habit = mongoose.model('Habit',habitSchema);
module.exports = Habit;