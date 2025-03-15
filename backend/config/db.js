import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(`${process.env.MONGO_URI}/food-del`)
    .then(() => console.log("DB Connected"));
};
