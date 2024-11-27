import userModel from "../models/user.model.js"

const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res.json({ success: false, message: "Missing userId or itemId" });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Ensure cartData exists as an object
    let cartData = userData.cartData || {};

    // Increment the quantity if the item exists
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      // Add the item to the cart with quantity 1
      cartData[itemId] = 1;
    }

    // Save the updated cart data
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.json({ success: false, message: error.message });
  }
};


const updateCart = async (req, res)=> {

  try {
    const {userId, itemId, size, quantity } = req.body
    const userData = await userModel.findById(userId)
    let cartData = await userData.cartData

    cartData[itemId][size] = quantity

    await userModel.findByIdAndUpdate(userId, {cartData})
    res.json({success : true, message : 'Cart Updated'})
  } catch (error) {
    
    console.log(error)
      res.json({success : false, message : error.message})
  }


}
const getUserCart = async (req, res)=> {
  try {
    
    const {userId} = req.body

  const userData = await userModel.findById(userId)
    let cartData = await userData.cartData

    res.json({success : true, cartData})
  } catch (error) {
    console.log(error)
    res.json({success : false, message : error.message})
  }

}

export {addToCart, updateCart, getUserCart}