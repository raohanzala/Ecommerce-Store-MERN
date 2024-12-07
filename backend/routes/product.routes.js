import express from 'express'
import { addProduct, listProduct, removeProduct, singleProduct, searchProducts, listPaginatedProducts } from '../controllers/product.controller.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'

const productRouter = express.Router()


const uploadArray = [
  {name : 'image1', maxCount: 1},
  {name : 'image2', maxCount: 1},
  {name : 'image3', maxCount: 1},
  {name : 'image4', maxCount: 1},
]

productRouter.post('/add', adminAuth,upload.fields(uploadArray) , addProduct)
productRouter.post('/remove', adminAuth,removeProduct)
productRouter.post('/single', singleProduct)
productRouter.get('/list', listProduct)

productRouter.get('/search', searchProducts);
productRouter.get('/paginated-list', listPaginatedProducts);


export default productRouter