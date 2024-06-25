const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file
const url = 'mongodb://127.0.0.1:27017/NotesDB';

mongoose.connect(url, { 
    // useNewUrlParser: true, 
    // useUnifiedTopology: true 
})
.then(() => {
    console.log('Database connection successful');
})
.catch(err => {
    console.error('Database connection error:', err);
});

module.exports = mongoose;
