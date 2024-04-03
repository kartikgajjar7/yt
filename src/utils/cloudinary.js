import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define the upload function
const upload_on_cloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response_by_cloudinary = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type: "auto",
            }
        );

        return response_by_cloudinary.url; // Return the URL of the uploaded file
    } catch (error) {
        // Handle upload errors
        console.log("Error uploading to Cloudinary:", error);
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
};

export { upload_on_cloudinary };
