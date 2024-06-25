const express = require('express');
const dotenv = require('dotenv');
const connection = require('./config/db');
const router = require('./routes/user.routes');
const noteRouter = require('./routes/note.routes');


dotenv.config();

const app = express();
const PORT = process.env.PORT ;

app.use(express.json());
app.use('/user', router);
app.use('/note', noteRouter);

app.get('/', (req, res) => {
  res.send('Health server is running fine');
});

app.listen(PORT, async() => {
  try {
    await connection
    console.log(`Server is listening on ${PORT} and Databse is also connected`);
  } catch (error) {
    console.log(error);
    
  }
  
});

