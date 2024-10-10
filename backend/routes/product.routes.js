import express from 'express'
import { addProduct, listProduct, removeProduct, singleProduct } from '../controllers/product.controller.js'
import upload from '../middleware/multer.js'

const productRouter = express.Router()


const uploadArray = [
  {name : 'image1', maxCount: 1},
  {name : 'image2', maxCount: 1},
  {name : 'image3', maxCount: 1},
  {name : 'image4', maxCount: 1},
]

productRouter.post('/add', upload.fields(uploadArray) , addProduct)
productRouter.post('/remove', removeProductProduct)
productRouter.post('single', singleProduct)
productRouter.get('/list', listProduct)

export default productRouter