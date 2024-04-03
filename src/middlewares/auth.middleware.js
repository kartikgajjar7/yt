import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { User } from "../models/user.model.js";
const VerifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.header("authorization")?.replace("bearer ", "");
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }
        const decodedToken = await jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );
        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshtoken"
        );
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "error in verify jwt token");
    }
});
export { VerifyJWT };
