

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
    message: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    }]

})

const GroupModel = mongoose.model("groups", groupSchema)
export default GroupModel;