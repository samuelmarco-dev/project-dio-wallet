import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserSchema from '../schemas/User.js';
dotenv.config();

async function create({ name, email, password }) {
    return await UserSchema.create({ name, email, password });
}

async function findByEmail(email) {
    return await UserSchema.findOne({ email });
}

async function findById(id) {
    return await UserSchema.findById(id);
}

async function generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

export default {
    create,
    findByEmail,
    findById,
    generateToken
};