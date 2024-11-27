import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name : {type : String , required : true},
  description : { type : String, required : true},
  oldPrice : {type : Number},
  newPrice : {type : Number, required : true},
  image : {type : Array},
  category : {type : String, required : true},
  subCategory : {type : String, required : true},
  sizes : {type : Array},
  bestSeller : {type : Boolean},
  availibility: {
    type: Boolean,
    required: true,
  },
  date : {type : Number, required : true}
})

const productModel = mongoose.models.product || mongoose.model("product", productSchema)

export default productModel