import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name : {type : String , required : true},
  description : { type : String, required : true},
  old_price : {type : Number},
  new_price : {type : Number, required : true},
  image : {type : Array},
  category : {type : String, required : true},
  sub_category : {type : String, required : true},
  sizes : {type : Array},
  bestseller : {type : Boolean},
  availibility : {type : Boolean, required : true},
  date : {type : Number, required : true}
})

const productModel = mongoose.models.product || mongoose.model("product", productSchema)

export default productModel