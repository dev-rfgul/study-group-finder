import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name: String,
    department: String,
    description: String,
    image: String,
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    messages: [
        {
            userID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            message: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now, // Automatically sets the timestamp
            }
        }
    ]
});

const GroupModel = mongoose.model("groups", groupSchema);
export default GroupModel;
