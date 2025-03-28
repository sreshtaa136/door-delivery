import userModel from "../models/userModel.js";

// add to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove food from user cart
const removeFromCart = async (req, res) => {
  const { itemId, userId } = req.body;
  try {
    let userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    if (!cartData[itemId]) {
      return res.json({ success: false, message: "Error" });
    }

    if (cartData[itemId] > 1) {
      cartData[itemId] -= 1;
    } else if (cartData[itemId] === 1) {
      delete cartData[itemId];
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    return res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};

// get user cart
const getCart = async (req, res) => {
  const { userId } = req.body;
  try {
    let userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData: cartData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addToCart, removeFromCart, getCart };
