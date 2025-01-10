import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import UserModel from './models/user.model.js'
import bcrypt from 'bcrypt'
import GroupModel from './models/group.model.js';
import MessageModel from './models/message.model.js';

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

        // If login is successful, return user data along with a success message
        const userData = {
            email: user.email,
            name: user.name,  // Add the user's name or any other info you need
            department: user.department,
            id: user._id,
            joinedGroups: user.joinedGroups,
            // You can add more user details here
        };

        res.status(200).json(userData); // Send user data as a JSON response
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
app.delete('/deleteGroupByID/:id', (req, res) => {
    const id = req.params.id;
    GroupModel.findByIdAndDelete({ _id: id })
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})
app.get('/getGroupByID/:id', (req, res) => {
    const id = req.params.id;
    GroupModel.findById({ _id: id })
        .then(group => res.status(200).json(group))
        .catch(error => res.status(400).json(error))
})
app.post('/joinGroup', async (req, res) => {
    const { userId, groupId } = req.body;

    try {
        const user = await UserModel.findById(userId);
        const group = await GroupModel.findById(groupId);


        if (!user || !group) {
            return res.status(404).json({ message: "the user of group has not been found" })
        }
        if (user.joinedGroups.includes(groupId)) {
            return res.status(400).json({ message: "the user had already joined the group" })
        }


        user.joinedGroups.push(groupId);
        await user.save();


        group.users.push(userId);
        await group.save();

        return res.status(200).json({ message: "the user has successfully joined the group" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "error while joining the group from line no 184" })
    }

})
app.delete('/removeGroup', async (req, res) => { 
    const { userId, groupId } = req.body;

    try {
        const user = await UserModel.findById(userId);
        const group = await GroupModel.findById(groupId);

        if (!user || !group) {
            return res.status(404).json({ message: "the user of group has not been found" })
        }
        if (!user.joinedGroups.includes(groupId)) {
            return res.status(400).json({ message: "the user had not joined the group" })
        }

        user.joinedGroups = user.joinedGroups.filter((groupID) => groupID !== groupId);
        await user.save();

        group.users = group.users.filter((userID) => userID !== userId);
        await group.save();

        return res.status(200).json({ message: "the user has successfully removed from the group" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "error while removing the user from the group" })
    }
})
app.post('/sendMessage', async (req, res) => {
    const { userId, groupId, messageContent } = req.body;

    // Validate request body
    if (!userId || !groupId || !messageContent) {
        return res.status(400).json({ error: "All fields (userId, groupId, messageContent) are required." });
    }

    try {
        // Correct field mapping for userID
        const newMessage = new MessageModel({
            userID: userId, // Schema expects 'userID'
            groupId,        // Schema expects 'groupId'
            message: messageContent // Schema expects 'message'
        });

        await newMessage.save();

        // Update group with the new message reference
        await GroupModel.findByIdAndUpdate(groupId, {
            $push: { messages: newMessage._id }
        });

        // Update user with the message reference
        await UserModel.findByIdAndUpdate(userId, {
            $push: {
                messageSent: {
                    groupId,
                    messages: newMessage._id
                }
            }
        });

        res.status(201).json({ message: "Message sent successfully." });
    } catch (error) {
        console.error("Error saving message:", error); // Logs the error for debugging
        res.status(500).json({ error: error.message }); // Sends the error message to the client
    }
});
app.get('/groups/:groupId/messages', async (req, res) => {
    const { groupId } = req.params;

    try {
        const group = await GroupModel.findById(groupId).populate({
            path: 'message',
            populate: { path: 'userID', select: 'name' }, // Populate user details for each message
        });

        if (!group) {
            return res.status(404).json({ error: "Group not found." });
        }

        res.status(200).json({ messages: group.message });
    } catch (error) {
        console.error("Error fetching group messages:", error);
        res.status(500).json({ error: "Failed to fetch group messages." });
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
