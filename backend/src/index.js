import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import UserModel from './models/user.model.js'
import bcrypt from 'bcrypt'
import GroupModel from './models/group.model.js';

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
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)
    try {
        const newUser = new UserModel({
            name,
            email,
            password: hash,
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


app.get('/getUsers', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(error => console.log(error))
})

app.get('/getUserByID/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({ _id: id })
        .then(user => res.json(user))
        .catch(error => res.json(error));
});
app.get('/getGroupByID/:id', (req, res) => {
    const id = req.params.id;
    GroupModel.findById({ _id: id })
        .then(group => res.status(200).json(group))
        .catch(error => res.status(400).json(error))
})

app.put('/updateUserByID/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({ _id: id }, { name: req.body.name, email: req.body.email, department: req.body.department, })
        .then(users => res.json(users))
        .catch(error => res.json(error))
})

app.put('/updateGroupByID/:id', async (req, res) => {
    const id = req.params.id;
    GroupModel.findByIdAndUpdate({ _id: id }, { name: req.body.name, description: req.body.description, department: req.body.department, image: req.body.image })
        .then(groups => res.status(200).json(groups))
        .catch(error => res.staus(500).json(error))
})

app.delete('/deleteUserByID/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(error => res.json(error))
})
app.delete('/deleteGroupByID/:id', (req, res) => {
    const id = req.params.id;
    GroupModel.findByIdAndDelete({ _id: id })
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).send("Invalid credentials"); // Generic error message
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send("Invalid credentials"); // Generic error message
        }

        // If login is successful
        res.status(200).send("User logged in successfully");
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.post("/createGroup", async (req, res) => {
    const { name, department, description, image, users } = req.body;
    console.log(name, department, description, image)
    try {
        const newGroup = new GroupModel({
            name,
            description,
            department,
            image,
            users
        })
        await newGroup.save();
        res.status(201).json(newGroup);
    }

    catch (err) {
        console.log(error)
        res.status(500).json({ message: "error while creating group " })
    }

})
app.get("/getGroups", async (req, res) => {
    GroupModel.find({})
        .then(groups => res.json(groups))
        .catch(error => console.log(error))
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
