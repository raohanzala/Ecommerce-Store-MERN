import mongoose from 'mongoose'

const connectDB = async ()=> {

  mongoose.connection.on('connected', ()=> {
    console.log('DB connected')
  })

  await mongoose.connect('mongodb+srv://raohanzala70:rao896345@cluster0.ra2u8.mongodb.net/e-commerce')


}

export default connectDB