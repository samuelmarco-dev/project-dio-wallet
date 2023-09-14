import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export async function connectDB() {
    const mongoURL = process.env.DATABASE_URI;
    
    try {
        await mongoose.connect(mongoURL);
        console.log("Database connected!");
    } catch (error) {
        const { message } = error;
        console.log(message);
    }
}

export async function disconnectDB() {
    try {
        await mongoose.disconnect();
    } catch (error) {
        const { message } = error;
        console.log(message);
    }
}