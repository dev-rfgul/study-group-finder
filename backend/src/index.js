import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import UserModel from './models/user.model.js'

dotenv.config();  // Load environment variables from .env

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.LOCALHOST_PORT || 3002;
const mongodbURL = process.env.MONGO_DB_URL
console.log(mongodbURL)
mongoose.connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB:', err);
    });

    app.post('/createUser', async (req, res) => {
        const { name, email, password, department } = req.body;
    
        try {
            const newUser = new UserModel({
                name,
                email,
                password,
                department
            });
    
            // Save the user to MongoDB
            await newUser.save();
    
            // Send back the created user
            res.status(201).json(newUser);
        } catch (error) {
            console.log('Error creating user:', error);
            res.status(500).json({ message: 'Error creating user' });
        }
    });
    
app.get('/hello', (req, res) => {
    console.log("hello world")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
