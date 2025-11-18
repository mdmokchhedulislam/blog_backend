import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dn5llg9d2",
    api_key: process.env.CLOUDINARY_API_KEY || "645463629883328",
    api_secret: process.env.CLOUDINARY_API_SECRET || "cZzuvUFGNwf8Vkc2YtSGquEP5FY"
});

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        fs.unlinkSync(localFilePath); // remove local file
        return response;
    } catch (err) {
        if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
        throw new Error("Cloudinary upload failed");
    }
};
