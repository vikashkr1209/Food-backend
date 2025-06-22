import mongoose from 'mongoose'


export const connectDB = async () => {
    (await mongoose.connect('mongodb+srv://vikash:vikash912@cluster0.azvfj.mongodb.net/food-delivery').then(() => console.log("db connected")));
}