import orderModel from "../models/order.model.js"
import userModel from "../models/user.model.js"


const placeOrder = async(req, res)=> {
  try {
      const {userId, items, amount, address} = req.body

      const orderData = {
        userId,
        items, amount,
        paymentMethod : "COD",
        payment : false,
        date : Date.now()
      }

      const newOrder = new orderModel(orderData)
      await newOrder.save()

      await userModel.findByIdAndUpdate(userId, {cartData : {}})

      re.json({success : true, message : 'Order Placed'})
  } catch (error) {
      console.log(error)
      res.json({success : false, message : error.message})
  }
}
const allOrders = async(req, res)=> {

  try {
      const orders = await orderModel.find({})
      res.json({success : true, orders})
  } catch (error) {
    console.log(error)
    res.json({success : false, message : error.message})
  }

}
const userOrders = async(req, res)=> {
  try {
      const {userId} = req.body
      const orders = await orderModel.find({userId})
      res.json({success : true, orders})
  } catch (error) {
    console.log(error)
    res.json({success : false, message : error.message})
  }
}
const updateStatus = async(req, res)=> {
  try {
    const {orderId, status} = req.body

    await orderModel.findByIdAndUpdate(orderId, {status})
    res.json({success : true, message : 'Status Updated'})
  } catch (error) {
    console.log(error)
    res.json({success : false, message : error.message})
  }
}

export {placeOrder, allOrders, userOrders, updateStatus}
