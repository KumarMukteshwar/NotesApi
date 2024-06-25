const mongoose = require('mongoose');

const uerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
        
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
   
},{
    versionKey:false
});

const UserModel = mongoose.model('User',uerSchema);

module.exports = UserModel;