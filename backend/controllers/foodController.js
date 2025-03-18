import foodModel from "../models/foodModel.js";
import { deleteImage, uploadImage } from "./uploadController.js";

// delete food
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    // fs.unlink(`uploads/${food.image}`, () => {});
    // delete image from Cloudinary
    await deleteImage(food.image);
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// add food
const addFood = async (req, res) => {
  const { name, description, price, category } = req.body;
  try {
    if (!req.file || !name || !description || !price || !category) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // upload image to Cloudinary
    const imageUrl = await uploadImage(req.file.buffer);

    const food = new foodModel({
      name,
      description,
      price,
      category,
      image: imageUrl,
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// // add food
// const addFood = async (req, res) => {
//   try {
//     let image_filename = `${req.file.filename}`;

//     const food = new foodModel({
//       name: req.body.name,
//       description: req.body.description,
//       price: req.body.price,
//       category: req.body.category,
//       image: image_filename,
//     });

//     await food.save();
//     res.json({ success: true, message: "Food Added" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// all food list
const listFood = async (req, res) => {
  const { category } = req.params;
  try {
    let foods;
    if (category) {
      foods = await listFoodByCategory(category);
    } else {
      foods = await foodModel.find({});
    }
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// list food by category
const listFoodByCategory = async (category) => {
  try {
    const foods = await foodModel.find({ category });
    return foods;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { listFood, addFood, removeFood, listFoodByCategory };
