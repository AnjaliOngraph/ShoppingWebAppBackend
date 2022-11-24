const mongoose = require("mongoose");

const AddressSchema= mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    mobileNo:{
        type: Number,
        required:true,
    },
    pinCode:{
        type: Number,
        required:true,
    },
    address:{
        type: String,
        required: true,
    },
    city:{
        type:String,
        required:true,
    },
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true 
    }
})
module.exports = mongoose.model('Address', AddressSchema);