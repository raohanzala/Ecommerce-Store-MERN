import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/product.model.js'

import sharp from 'sharp';

const addProduct = async (req, res) => {
  try {
    const { name, description, oldPrice, newPrice, category, subCategory, sizes, bestSeller, availibility } = req.body;

    // Extract images from the request
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(item => item !== undefined);

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        return new Promise((resolve, reject) => {
          sharp(item.path)
            .webp({ quality: 80 })
            .toBuffer((err, webpBuffer) => {
              if (err) {
                console.error('Sharp Error:', err);
                return reject(err);
              }
    
              const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: 'image' },
                (error, result) => {
                  if (error) {
                    console.error('Cloudinary Error:', error);
                    return reject(error);
                  }
                  console.log('Cloudinary Upload Result:', result);
                  resolve(result.secure_url);
                }
              );
    
              uploadStream.end(webpBuffer);
              console.log('Uploading WebP Buffer:', webpBuffer);
            });
        });
      })
    );
    
    const productData = {
      name,
      description,
      category,
      subCategory,
      oldPrice: Number(oldPrice),
      newPrice: Number(newPrice),
      bestSeller: bestSeller === 'true' ? true : false,
      sizes: JSON.parse(sizes),
      availibility,
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: 'Product Added', product });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

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

const editProduct = async (req, res) => {
   try {
     const { productId, name, description, oldPrice, newPrice, category, subCategory, sizes, bestSeller, availibility } = req.body;
 
     const product = await productModel.findById(productId);
     if (!product) {
       return res.json({ success: false, message: 'Product not found' });
     }
 
     const image1 = req.files.image1 && req.files.image1[0];
     const image2 = req.files.image2 && req.files.image2[0];
     const image3 = req.files.image3 && req.files.image3[0];
     const image4 = req.files.image4 && req.files.image4[0];
 
     const images = [image1, image2, image3, image4].filter(item => item !== undefined);
 
     let imagesUrl = [];
     if (images.length > 0) {
       imagesUrl = await Promise.all(
         images.map(async (item) => {
           const webpBuffer = await sharp(item.path).webp({ quality: 80 }).toBuffer();
           const result = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
             if (error) throw error;
             return result;
           }).end(webpBuffer);
 
           return result.secure_url;
         })
       );
     }
 
     const updatedProductData = {
       name: name || product.name,
       description: description || product.description,
       oldPrice: oldPrice ? Number(oldPrice) : product.oldPrice,
       newPrice: newPrice ? Number(newPrice) : product.newPrice,
       category: category || product.category,
       subCategory: subCategory || product.subCategory,
       sizes: sizes ? JSON.parse(sizes) : product.sizes,
       bestSeller: bestSeller !== undefined ? bestSeller === 'true' : product.bestSeller,
       availibility: availibility !== undefined ? availibility : product.availibility,
       image: imagesUrl.length > 0 ? imagesUrl : product.image,
       date: Date.now(),
     };
 
     const updatedProduct = await productModel.findByIdAndUpdate(productId, updatedProductData, { new: true });
     res.json({ success: true, message: 'Product Updated', product: updatedProduct });
   } catch (error) {
     console.error(error);
     res.json({ success: false, message: error.message });
   }
 };


const searchProducts = async (req, res) => {
   const { query } = req.query; 
   
   if (!query) {
     return res.status(400).json({ success: false, message: 'Query parameter is required' });
   }
 
   try {
     const products = await productModel.find({
       $or: [
         { name: { $regex: query, $options: 'i' } },
         { description: { $regex: query, $options: 'i' } },
       ],
       availibility: true, 
     });
 
     res.status(200).json({ success: true, products });
   } catch (error) {
     console.error('Error searching products:', error);
     res.status(500).json({ success: false, message: 'Internal Server Error' });
   }
 };

 const listPaginatedProducts = async (req, res) => {
  try {
    // 1️⃣ Get page and limit, make sure they are valid numbers and have safe limits
    const page = Math.max(1, parseInt(req.query.page)) || 1; 
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit))) || 10; 
    const skip = (page - 1) * limit;

    console.log(skip, limit, page)

    // 2️⃣ Get paginated products
    const products = await productModel
      .find({})
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 })
      .lean(); // 🚀 Faster, plain JS objects

      console.log(products, 'paginated')

    // 3️⃣ Get total product count
    const totalProducts = await productModel.countDocuments();

    // 4️⃣ Calculate total pages and check if more pages exist
    const totalPages = Math.ceil(totalProducts / limit);
    const hasMore = page < totalPages;

    // 5️⃣ Handle no products case
    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No products found for this page',
        products: [],
        pagination: {
          currentPage: page,
          totalPages,
          totalProducts,
        },
      });
    }

    // 6️⃣ Send response to client
    res.status(200).json({
      success: true,
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        hasMore, // Helps client know if more pages are available
      },
    });

  } catch (error) {
    console.error(`Error in listPaginatedProducts: ${error.message}`); // For backend logs
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message, // Debug information
    });
  }
};

 

export {listProduct, addProduct, removeProduct, singleProduct, editProduct, searchProducts, listPaginatedProducts}