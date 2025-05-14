import { configDotenv } from 'dotenv'
import mongoose from 'mongoose'
configDotenv()

const MONGO_URI=process.env.MONGO_URI
const connectDB=async()=>{
    try{
        await mongoose.connect(MONGO_URI)
        console.log('Mongo DB is connected')

    }catch(err){
        console.log('Failed to connect to mongodb.',err)
    }
}

export default connectDB