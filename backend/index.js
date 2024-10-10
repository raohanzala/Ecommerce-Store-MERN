import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'
import connectDB from './config/mongoDB.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()


// middleware
app.use(express.json())
app.use(cors())


// API Creation
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)



app.get('/', (req, res) => {
  res.send('Express App is Running')
})

app.listen(port, (error) => {
    if (!error) {
      console.log(`Server running on port ${port}`)
    } else {
      console.log(`Error ${error}`)
    }
  })





// ================== Prevoius Code =========================

// Image Storage Engine

// const storage = multer.diskStorage({
//   destination: './upload/images',
//   filename: (req, file, cb) => {
//     return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//   }
// })


// const upload = multer({ storage: storage })


// // Creating Upload End Point for images
// app.use('/images', express.static('upload/images'))
// app.post('/upload', upload.single('product'), (req, res) => {
//   console.log('Upload route hit');
//   if (req.file) {
//     console.log('File uploaded:', req.file);
//   } else {
//     console.log('No file uploaded');
//   }
//   res.json({  
//     success: 1,
//     image_url: `http://localhost:${port}/images/${req.file.filename}`
//   })
// })

// const Product = mongoose.model('Product', {
//   id: {
//     type: Number,
//     required: true
//   },
//   name: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   image: {
//     type: Array,
//     required: true
//   },
//   sizes: {
//     type: Array,
//     required: false
//   },
//   category: {
//     type: String,
//     required: true
//   },
//   sub_category: {
//     type: String,
//     required: true
//   },
//   new_price: {
//     type: Number,
//     required: true
//   },
//   old_price: {
//     type: Number,
//     required: true
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
//   available: {
//     type: String,
//     required: false, 
//     default: 'In Stock'
//   }
// })

// app.post('/addproduct', async (req, res) => {
//   let products = await Product.find({})
//   let id;
//   if (products.length > 0) {
//     let last_product_array = products.slice(-1)
//     let last_product = last_product_array[0]
//     id = last_product.id + 1
//   } else {
//     id = 1
//   }
//   const product = new Product({
//     name: req.body.name,
//     description: req.body.description,
//     image: req.body.image,
//     category: req.body.category,
//     sub_category: req.body.sub_category,
//     sizes: req.body.sizes,
//     new_price: req.body.new_price,
//     old_price: req.body.old_price,
//     available: req.body.available || 'In Stock'
//   })

  

//   console.log(product)
//   await product.save()
//   console.log('saved')
//   res.json({
//     success: true,
//     name: req.body.name
//   })
// })

// // Creating API For deleting Products

// app.post('/removeproduct', async (req, res) => {
//   try {
//     await Product.findOneAndDelete({ id: req.body.id });
//     res.json({ success: true, name: req.body.name });
//   } catch (error) {
//     res.status(500).json({ success: false, errors: 'Error deleting product' });
//   }
// });

// // Creating Api for getting all products 

// app.get('/allproducts', async (req, res) => {
//   let products = await Product.find({})
//   console.log('All products Fetched')
//   res.send(products)
// })


// // Schema creating for User model

// const Users = mongoose.model('Users', {
//   name: {
//     type: String,
//   },
//   email: {
//     type: String,
//     unique: true
//   },
//   password: {
//     type: String
//   },
//   cartData: {
//     type: Object
//   },
//   date: {
//     type: Date,
//     default: Date.now
//   }
// })


// // Creating Endpoint for registering the user

// app.post('/signup', async (req, res) => {
//   let check = await Users.findOne({ email: req.body.email })
//   if (check) {
//     return res.status(400).json({ success: false, errors: 'existing user found with same email address' })
//   }

//   let cart = {}
//   for (let i = 0; i < 300; i++) {
//     cart[i] = 0
//   }

//   const user = new Users({
//     name: req.body.username,
//     email: req.body.email,
//     password: req.body.password,
//     cartData: cart
//   }) 

//   await user.save()

//   const data = {
//     user: {
//       id: user.id
//     }
//   }

//   const token = jwt.sign(data, 'secret_ecom')
//   res.json({ success: true, token })
// })

// // creating  endpoint for user login

// app.post('/login', async (req, res) => {
//   try {
//     let user = await Users.findOne({ email: req.body.email });
//     if (!user) {
//       return res.status(401).json({ success: false, errors: 'Wrong Email ID' });
//     }
    
//     const passCompare = await bcrypt.compare(req.body.password, user.password);
//     if (!passCompare) {
//       return res.status(401).json({ success: false, errors: 'Wrong Password' });
//     }

//     const data = { user: { id: user.id } };
//     const token = jwt.sign(data, jwtSecret, { expiresIn: '1h' });
//     res.json({ success: true, token });
//   } catch (error) {
//     res.status(500).json({ success: false, errors: 'Server error during login' });
//   }
// });


// app.listen(port, (error) => {
//   if (!error) {
//     console.log(`Server running on port ${port}`)
//   } else {
//     console.log(`Error ${error}`)
//   }
// })


// // --------------- Order ----------------


// const Order = mongoose.model('Order', {
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Users',
//     required: true
//   },
//   products: [
//     {
//       productId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product',
//         required: true
//       },
//       quantity: {
//         type: Number,
//         required: true
//       }
//     }
//   ],
//   totalAmount: {
//     type: Number,
//     required: true
//   },
//   status: {
//     type: String,
//     default: 'Pending',
//     required: true
//   },
//   orderDate: {
//     type: Date,
//     default: Date.now
//   }
// });


// app.post('/placeorder', async (req, res) => {
//   const { userId, products, totalAmount } = req.body;
//   console.log(req)

//   const newOrder = new Order({
//     userId: userId,
//     products: products,
//     totalAmount: totalAmount
//   });

//   try {
//     await newOrder.save();
//     res.json({ success: true, message: 'Order placed successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, error: 'Failed to place order' });
//   }
// });


// app.get('/allorders', async (req, res) => {
//   try {
//     const orders = await Order.find({}).populate('userId').populate('products.productId');
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ success: false, error: 'Failed to fetch orders' });
//   }
// });
