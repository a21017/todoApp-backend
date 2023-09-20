
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const UserSchema = Schema({

    userName :{ type: String },
    email:{type:String,required:true},
    password:{type:String,required:true},
    userTasks:[{title:{type:String,required:true},detail:{type:String,required:true}}],
})


module.exports = mongoose.model('User',UserSchema);
