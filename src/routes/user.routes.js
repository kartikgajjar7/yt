import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
    logOutUser,
    loginUser,
    refreshAccessToken,
    registerUser,
} from "../controllers/user.controller.js";
import { VerifyJWT } from "../middlewares/auth.middleware.js";
import { verify } from "jsonwebtoken";
const router = Router();

//users->register : post method
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: "coverimage",
            maxCount: 1,
        },
    ]),
    registerUser
);
router.route("/login").post(loginUser);

//secured user
router.route("/logout").post(VerifyJWT, logOutUser);
router.route("/refresh-token").post(refreshAccessToken);
export default router;
