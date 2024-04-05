import { apiResponse } from "./apiresponse.js";
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (err) {
        console.log("asyncHandler fn error : ", err.stack);
        console.log("type of error is : ", Object.getOwnPropertyNames(err));
        res.status(err.statuscode || 500).json({
            statuscode: err.statusCode,
            success: err.success,
            data: err.message,
            location: err.stack.replace(/\\/g, "").split("\n").join("\n"),
        });
    }
};
export { asyncHandler };
