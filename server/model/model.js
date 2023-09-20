const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
    },
    lastName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    country:{
        type:String,
        require:true,
    },
    state:{
        type:String,
        require:true,
    },
    city:{
        type:String,
        require:true,
    },
    gender:{
        type:String,
        require:true,
    },
    dob:{
        type:String,
        require:true,
    },
    age:{
        type:Number,
        require:true,
    }
},
{
    versionKey:false
})

const form = mongoose.model("form",formSchema);

module.exports = form;