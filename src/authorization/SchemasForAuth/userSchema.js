const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    registeredAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("users",userSchema);