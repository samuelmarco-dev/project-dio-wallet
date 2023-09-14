import bcrypt from 'bcrypt';
import authRepository from '../repositories/authRepository.js';

async function signUp(body) {
    const { name, email, password } = body;
    if(!name || !email || !password) throw new Error('Missing fields');
    
    const userExists = await authRepository.findByEmail(email);
    if(userExists) throw new Error('User already exists');
    else {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
    
        return await authRepository.create({ name, email, password: hashedPassword });
    }
}

async function signIn(body) {
    const { email, password } = body;
    if(!email || !password) throw new Error('Missing fields');

    const userExists = await authRepository.findByEmail(email);
    if(!userExists) throw new Error('User not found');

    const isPasswordCorrect = bcrypt.compareSync(password, userExists.password);
    if(!isPasswordCorrect) throw new Error('Invalid password');
    else {
        return await authRepository.generateToken(userExists._id);
    }
}

export default {
    signUp,
    signIn
};