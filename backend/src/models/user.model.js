

import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

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
userSchema.methods.generateToken = function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
        },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '30d'
            }
        )
    } catch (error) {
        console.log("error :: ", error)
    }
}

const UserModel = mongoose.model("users", userSchema)
export default UserModel