import { z } from "zod";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { apiResponse } from "../utils/apiresponse.js";
import { upload_on_cloudinary } from "../utils/cloudinary.js";
import { generatwAccesssAndRefreshToken } from "../utils/generateAccessAndRefreshToken.js";

import mongoose from "mongoose";
const registerUser = asyncHandler(async (req, res) => {
    const reqestBody = req.body;

    //USERSCHEMA OF USER OBJECT
    const UserSchema = z.object({
        username: z.string().min(1, "Username is not valid"),
        email: z.string().email("Kindly enter a valid Email"),
        fullname: z.string().min(1, "Fullname is not valid"),
        password: z.string().min(8, "Password  must be more then 8 characters"),
    });

    // VALIDATE IT USING PARSE FUNCTION
    try {
        const validation = UserSchema.parse(reqestBody);
    } catch (error) {
        throw new ApiError(400, error.issues[0].message, error.issues);
    }
    const { username, email, fullname, password } = req.body;
    // check weather user exist or not

    const existUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existUser) {
        throw new ApiError(400, "User already exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverimage[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }
    let Cloudinary_Coverimage_Response = "";
    if (coverImageLocalPath) {
        Cloudinary_Coverimage_Response =
            await upload_on_cloudinary(coverImageLocalPath);
    }
    const Cloudinary_Avatar_Response =
        await upload_on_cloudinary(avatarLocalPath);
    coverImageLocalPath;

    if (!Cloudinary_Avatar_Response) {
        throw new ApiError(400, "Avatar file is required");
    }

    const User_Create_Response = await User.create({
        fullname,
        avatar: Cloudinary_Avatar_Response,
        coverimage: Cloudinary_Coverimage_Response || "",
        email,
        password,
        username: username.toLowerCase(),
    });
    const isUserCreated = await User.findById(User_Create_Response._id).select(
        "-password -refreshtoken"
    );
    if (!isUserCreated) {
        throw new ApiError(500, "User is not registered ");
    }
    res.status(201).json(
        new apiResponse(200, isUserCreated, "User is Successfully registered")
    );
});
const loginUser = asyncHandler(async (req, res) => {
    const reqestBody = req.body;
    console.log("body", reqestBody);
    const UserSchema = z.union([
        z.object({
            username: z.string().min(1, "Username is not valid"),
            password: z
                .string()
                .min(8, "Password must be more than 8 characters"),
        }),
        z.object({
            email: z.string().email("Kindly enter a valid Email"),
            password: z
                .string()
                .min(8, "Password must be more than 8 characters"),
        }),
    ]);
    try {
        const validation = UserSchema.parse(reqestBody);
    } catch (error) {
        console.log(" error : ", error);
        throw new ApiError(400, error.issues[0].message, error.issues);
    }
    const { username, email, password } = req.body;
    const existUser = await User.findOne({
        $or: [{ username }, { email }],
    });
    if (!existUser) {
        throw new ApiError(404, "User is not available");
    }
    const IsPassValid = await existUser.IS_PASSWORD_CORRECT(password);
    if (!IsPassValid) {
        throw new ApiError(404, "Invalid User Credintial");
    }
    const { accessToken, refreshToken } = await generatwAccesssAndRefreshToken(
        existUser._id
    );
    console.log("refresh: ", refreshToken);
    const LoggedInUser = await User.findById(existUser._id);
    const option = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json(
            new apiResponse(
                200,
                {
                    user: LoggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User Succesfully Logged in"
            )
        );
});
const logOutUser = asyncHandler(async (req, res) => {
    const Existing_user = req.user;
    console.log("Loggingg Out User......");
    console.log("Current User is : ", Existing_user);
    const User_id = req.user._id;
    await User.findByIdAndUpdate(User_id, {
        $set: {
            refreshtoken: undefined,
        },
    });
    const option = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .clearCookie("accessToken", option)
        .clearCookie("refreshToken", option)
        .json(new apiResponse(200, {}, "User is Logged Out"));
});
const refreshAccessToken = asyncHandler(async (req, res) => {
    const Incoming_Refresh_Token =
        req.cookies.refreshToken || req.body.refreshToken;
    if (!Incoming_Refresh_Token) {
        throw new ApiError(401, "Unauthorized requesr");
    }
    try {
        const decoded_token = jwt.verify(
            Incoming_Refresh_Token,
            process.env.REFRESH_TOKEN_SECRET
        );
        const user = await User.findById(decoded_token?._id);
        if (!user) {
            throw new ApiError(401, "invalid token");
        }
        if (Incoming_Refresh_Token !== user.refreshtoken) {
            throw new ApiError(401, "refresh token is expired");
        }
        const options = {
            httpOnly: true,
            secure: true,
        };
        const { new_accessToken, new_refreshToken } =
            await generatwAccesssAndRefreshToken(user._id);
        return res
            .status(200)
            .cookie("accessToken", new_accessToken, options)
            .cookie("refreshToken", new_refreshToken, options)
            .json(
                new apiResponse(
                    200,
                    { new_accessToken, new_refreshToken },
                    "Access token refreshed"
                )
            );
    } catch (error) {
        throw new ApiError(401, error?.message, "Invalid refresh token");
    }
});
const ChangeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const Current_User_id = req.user._id;
    const Current_User = await User.findById(Current_User_id);
    const is_password_is_correct =
        await Current_User.IS_PASSWORD_CORRECT(oldPassword);
    if (!is_password_is_correct) {
        throw new ApiError(400, "Invalid Old Password");
    }
    Current_User.password = newPassword;
    await Current_User.save({ validateBeforeSave: false });
    return res
        .status(200)
        .json(new apiResponse(200, {}, "Password changed succesfully"));
});
const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(200, req.user, "Currrent user fetched succesfully");
});
const updateAccountDtailsTextbased = asyncHandler(async (req, res) => {
    const { fullname, email } = req.body;
    if (!fullname && !email) {
        throw new ApiError(400, "All fields are required");
    }
    const Updated_User = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                fullname,
                email,
            },
        },
        { new: true }
    ).select("-password");
    res.status(200).json(
        new apiResponse(
            200,
            Updated_User,
            "Account datails updated succesfully"
        )
    );
});
const UpdateUserAvatar = asyncHandler(async (req, res) => {
    const new_avatar_localpath = req.file.path;
    const current_user_id = req.user._id;
    const user_rn = await User.findById(current_user_id);
    const oldAvatar = user_rn.avatar;
    if (!new_avatar_localpath) {
        throw new ApiError(404, "new avtar is not in request body");
    }
    const Cloudinary_New_Avatar_Response =
        await upload_on_cloudinary(new_avatar_localpath);
    if (!Cloudinary_New_Avatar_Response) {
        throw new ApiError(500, "Clodinary upload error in new avatar");
    }
    const Updated_User = await User.findByIdAndUpdate(
        current_user_id,
        {
            $set: {
                avatar: Cloudinary_New_Avatar_Response,
            },
        },
        { new: true }
    ).select("-password");
    if (oldAvatar) {
        await cloudinary.uploader.destroy(oldAvatar);
    }
    res.status(200).json(
        new apiResponse(200, Updated_User, "Avatar image Updated successfully")
    );
});
const UpdateCoverImage = asyncHandler(async (req, res) => {
    const new_coverimage_localpath = req.file.path;
    const current_user_id = req.user._id;
    if (!new_coverimage_localpath) {
        throw new ApiError(404, "new avtar is not in request body");
    }
    const Cloudinary_New_coverimage_Response = await upload_on_cloudinary(
        new_coverimage_localpath
    );
    if (!Cloudinary_New_coverimage_Response) {
        throw new ApiError(500, "Clodinary upload error in new avatar");
    }
    const Updated_User = await User.findByIdAndUpdate(
        current_user_id,
        {
            $set: {
                avatar: Cloudinary_New_coverimage_Response,
            },
        },
        { new: true }
    ).select("-password");
    res.status(200).json(
        new apiResponse(200, Updated_User, "Avatar image Updated successfully")
    );
});
const GetChannelProfileDetails = asyncHandler(async (req, res) => {
    const { channelname } = req.params;
    if (!username?.trim()) {
        throw new ApiError(400, "Channel name is not into request params");
    }
    const channel_info_response = await User.aggregate([
        {
            $match: {
                username: channelname,
            },
        },
        {
            $lookup: {
                from: "Subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscriber_count",
            },
        },
        {
            $lookup: {
                from: "Subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribered_to",
            },
        },
        {
            $addFields: {
                subscribersCount: {
                    $size: "$subscriber_count",
                },
                subscribedTocount: {
                    $size: "$subscribered_to",
                },
                isSubscribed: {
                    $cond: {
                        if: {
                            $in: [req.user?._id, "$subscribers.subcriber"],
                            then: true,
                            else: false,
                        },
                    },
                },
            },
        },
        {
            $project: {
                fullname: 1,
                username: 1,
                subscribersCount: 1,
                subscribedTocount: 1,
                isSubscribed: 1,
                avatar: 1,
                coverimage: 1,
                email: 1,
            },
        },
    ]);
});

const UserHistory = asyncHandler(async (req, res) => {
    const Current_User_id = req.user._id;
    const User = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(Current_User_id),
            },
        },
        {
            $lookup: {
                from: "videos",
                localField: "$watchhistory",
                foreignField: "_id",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "VideoCreator",
                        },
                    },
                ],
                as: "watchhistory",
            },
        },
    ]);
});
export {
    registerUser,
    loginUser,
    logOutUser,
    refreshAccessToken,
    ChangeCurrentPassword,
    getCurrentUser,
    updateAccountDtailsTextbased,
    UpdateUserAvatar,
    UserHistory,
};
