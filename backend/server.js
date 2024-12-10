// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config.js'
// import connectDB from './config/mongoDB.js'
// import connectCloudinary from './config/cloudinary.js'
// import userRouter from './routes/user.routes.js'
// import productRouter from './routes/product.routes.js'
// import cartRouter from './routes/cart.routes.js'
// import orderRouter from './routes/order.routes.js'

// const app = express()
// const port = process.env.PORT || 4000
// connectDB()
// connectCloudinary()


// // middleware
// app.use(express.json())
// app.use(cors())


// // API Creation
// app.use('/api/user', userRouter)
// app.use('/api/product', productRouter)
// app.use('/api/cart', cartRouter)
// app.use('/api/order', orderRouter)



// app.get('/', (req, res) => {
//   res.send('Express App is Running')
// })

// app.listen(port, (error) => {
//     if (!error) {
//       console.log(`Server running on port ${port}`)
//     } else {
//       console.log(`Error ${error}`)
//     }
//   })


import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';
import connectDB from './config/mongoDB.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js';
import orderRouter from './routes/order.routes.js';

dotenv.config(); // Ensure dotenv is initialized

const app = express();
const port = process.env.PORT || 4000;

// Create HTTP server to attach Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins (restrict in production for security)
  },
});

// Connect to MongoDB
(async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');
    connectCloudinary();
    console.log('Cloudinary configured');
  } catch (error) {
    console.error('Error initializing services:', error.message);
    process.exit(1); // Exit on critical failure
  }
})();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Express App is Running');
});

// MongoDB Change Streams for Notifications
import { MongoClient } from 'mongodb';

(async () => {
  try {
    const mongoClient = new MongoClient('mongodb+srv://raohanzala70:rao896345@cluster0.ra2u8.mongodb.net/e-commerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await mongoClient.connect();

    const db = mongoClient.db('e-commerce'); // Replace 'e-commerce' with the actual database name
const collection = db.collection('orders'); // Replace with your collection name

    console.log('Listening for changes in MongoDB...');

    const changeStream = collection.watch();

    // Emit changes to connected clients via Socket.IO
    changeStream.on('change', (change) => {
      console.log('Change detected:', change);
      io.emit('notification', change); // Send notification to all connected clients
    });
  } catch (error) {
    console.error('Error setting up Change Streams:', error.message);
  }
})();

// Handle Socket.IO Connections
io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('A client disconnected:', socket.id);
  });
});

// Start the Server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});






