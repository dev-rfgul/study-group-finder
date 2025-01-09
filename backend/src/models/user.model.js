// import mongoose, { schema } from 'mongoose';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken'

// const userSchema = new Schema({

//     username: {
//         type: String,
//         reqired: true,
//         unique: true,
//         lowercase: true,
//         trim: true,
//         index: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         lowercase: true,
//         trim: true,
//     },
//     avatar: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     refreshToken: {
//         type: String,
//     },

// }, { timestamps: true });

// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();

//     this.password = await bcrypt.hast(this.password, 10)
//     next()
// })



// userSchema.methods.isPasswordCorrect = async function (password) {
//     return await bcrypt.compare(password, this.password)
// }


// userSchema.methods.generateAccessToken = function () {
//     return jwt.sign(
//         {
//             _id: this._id,
//             email: this.email,
//             username: this.username,
//             fullName: this.fullName
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         {
//             expiresIn: process.env.ACCESS_TOKEN_EXPIRY
//         }
//     )
// }

// userSchema.methods.generateRefreshToken = function () {
//     return jwt.sign({
//         _id: this.id,
//     },
//         process.env.REFRESH_TOKEN_SECRET,
//         {
//             expiresIn: process.env.REFRESH_TOKEN_EXPIRY
//         }
//     )
// }

// export const User = mongoose.model("User", userSchema)


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