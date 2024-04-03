import { apiResponse } from "./apiresponse.js";
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (err) {
        console.log("asyncHandler fn error : ", err);

        res.status(err.statuscode || 500).json({});
    }
};
export { asyncHandler };
