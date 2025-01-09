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
    { timestamps: true } // This will add createdAt and updatedAt fields automatically
);

const MessageModel = mongoose.model('Message', messageSchema);
export default MessageModel;
