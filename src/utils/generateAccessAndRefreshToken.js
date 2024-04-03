import { User } from "../models/user.model.js";
import { ApiError } from "./apiError.js";

const generatwAccesssAndRefreshToken = async (user_id) => {
    try {
        const user = await User.findById(user_id);
        const accessToken = await user.GENERATE_ACCESS_TOKEN();
        const refreshToken = await user.GENERATE_REFRESH_TOKEN();

        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating Access and Refreshtoken"
        );
    }
};
export { generatwAccesssAndRefreshToken };
