import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Schema } from "mongoose";
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: [true, "Fullname is required"],
            lowercase: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String, //cloudnary id
            required: [true, "Avatar is required"],
        },
        coverimage: {
            //cloudnary id
            type: String,
        },
        watchhistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            },
        ],
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        refreshtoken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);
// HASHING PASSWORD BEFORE DOCUMENT IS BEING SAVED
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 8);
    next();
});
// `ISPASSWORDCORRECT`- method to check Users entered password and encrypted one
userSchema.methods.IS_PASSWORD_CORRECT = async function (password) {
    return await bcrypt.compare(password, this.password);
};
//GENERATE_ACCESS_TOKEN
userSchema.methods.GENERATE_ACCESS_TOKEN = function () {
    const token = jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
    return token;
};
userSchema.methods.GENERATE_REFRESH_TOKEN = function () {
    const token = jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
    return token;
};

export const User = mongoose.model("User", userSchema);
