import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        groupId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group',
        },
        message: {
            type: String,
            required: true,
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const MessageModel = mongoose.model('Message', messageSchema);
export default MessageModel;
