

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    department: String,
    joinedGroups: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group'
        }
    ],
    messageSent: [
        {
            groupId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Group'
            },
            message: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Message"
            }
        }
    ]


})

const UserModel = mongoose.model("users", userSchema)
export default UserModel