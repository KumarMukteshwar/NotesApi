const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    userId:{
        type:String,
        required:true
    }, 
    userName:{
        type: String,
        required: true,
        unique: true
    }
},{
    VersionKey:false,
    timestamps:true
})

const NoteModel = mongoose.model('Note', noteSchema);

module.exports = NoteModel;