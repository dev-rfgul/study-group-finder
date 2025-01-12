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























// import mongoose from "mongoose";

// const messageSchema = new mongoose.Schema(
//   {
//     userID: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true, // Ensure every message has a sender
//     },
//     groupId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Group',
//       required: true, // Ensure every message belongs to a group
//     },
//     message: {
//       type: String,
//       required: true, // Ensure the message content is provided
//       trim: true,     // Remove leading/trailing spaces
//     },
//     type: {
//       type: String,
//       enum: ['text', 'image', 'file'], // Restrict message types
//       default: 'text',
//     },
//     mediaUrl: {
//       type: String, // For storing URLs of images/files
//       default: null,
//     },
//     isEdited: {
//       type: Boolean,
//       default: false, // Track if the message was edited
//     },
//   },
//   { timestamps: true } // Automatically adds createdAt and updatedAt fields
// );

// // Add indexes for faster querying
// messageSchema.index({ groupId: 1, createdAt: -1 });

// const MessageModel = mongoose.model('Message', messageSchema);
// export default MessageModel;
