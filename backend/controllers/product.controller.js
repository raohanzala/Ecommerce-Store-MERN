import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/product.model.js'

const addProduct = async (req, res)=> {
 try {
    const {name, description, old_price, new_price, category, sub_category, sizes, bestseller, availibility} = req.body

    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    const images = [image1, image2, image3, image4].filter(item=> item !== undefined)


    let imagesUrl = await Promise.all(
      images.map(async (item)=> {
         let result  = await cloudinary.uploader.upload(item.path, {resource_type : 'image'})
         return result.secure_url
      })
    )

    const productData = {
      name,
      description,
      category,
      sub_category,
      old_price : Number(old_price),
      new_price : Number(new_price),
      bestseller : bestseller === 'true' ? true : false,
      sizes  : JSON.parse(sizes),
      availibility,
      image : imagesUrl,
      date : Date.now()
    }

    console.log(imagesUrl)

    const product = new productModel(productData)
    console.log(product)

    await product.save()

    res.json({success : true, message : 'Product Added'})

 } catch (error) {
    console.log(error)
    res.json({success: false, message : error.message})
 }
}
const listProduct = async(req, res)=> {

   try {
         const products = await productModel.find({})
         res.json({success : true, products})
   } catch (error) {
         console.log(error)
         res.json({success : false, message : error.message})
   }

}
const removeProduct = async (req, res)=> {

   try {
      await productModel.findByIdAndDelete(req.body.id)
      res.json({success : true, message : 'Product Removed'})
   } catch (error) {
      console.log(error)
      res.json({success : false, message : error.message})
   }

}
const singleProduct = async (req, res)=> {
   try {
      const {productId} = req.body
      const product = await productModel.findById(productId)
      res.json({success : true, product})
   } catch (error) {
      console.log(error)
         res.json({success : false, message : error.message})
   }
}

export {listProduct, addProduct, removeProduct, singleProduct}