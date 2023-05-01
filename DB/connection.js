import mongoose from 'mongoose';
mongoose.set('strictQuery', true);
const connectDB = async ()=>{
    return await mongoose.connect(process.env.DB_URL).then(results=>{
        console.log('Successfully connected to DB');
    }).catch(err=>{
        console.log('Failed connection',err);
    })
}
export default connectDB;