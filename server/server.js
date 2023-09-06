const express = require("express");
const router = express.Router();
const cors = require('cors');
const { userModel} = require('./models/user.js'); // Check the path to your model file

const mongoose = require("mongoose");
const app = express();
app.use(express.json({limit: '50mb'}));
app.use(cors());

const uri =
  "mongodb+srv://mansourprogrammer:r5wYmWVPQmfvTIb1@cluster0.ulzkdfj.mongodb.net/allData?retryWrites=true&w=majority";


  async function getAllUsers() {
    try {
      const users = await userModel.find({})
      console.log(users)
      return users;
    } catch (error) {
      throw error; // Handle errors as needed
    }
  }  

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}




app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/api/v1', async (req, res) => {
  try {
    const users = await getAllUsers({}); // Call the function to get all users
    res.status(200).json(users); 
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/v1', async (req, res) => {
  try {
    const dataReceived = req;
    console.log(dataReceived.body);
    userModel.create(dataReceived.body).then((users1)=>{res.json(users1)}).catch((err) =>{ console.log(err,"dd")})
    res.status(200).json({ message: 'Data received successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
connect();

app.listen(8000, () => {
  console.log("Server started on port 8000");
});