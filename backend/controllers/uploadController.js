import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// upload image and return Cloudinary URL
export const uploadImage = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "food-delivery" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};

// Delete Image from Cloudinary
export const deleteImage = async (imageUrl) => {
  try {
    const publicId = imageUrl.split("/").pop().split(".")[0]; // Extract public ID
    await cloudinary.uploader.destroy(`food-delivery/${publicId}`);
    return true;
  } catch (error) {
    throw new Error("Failed to delete image");
  }
};
