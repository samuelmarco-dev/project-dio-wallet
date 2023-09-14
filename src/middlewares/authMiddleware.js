import jwt from 'jsonwebtoken';
import authRepository from '../repositories/authRepository.js';

export async function authMiddleware(req, res, next) {
    const { authorization } = req.headers;
    if(!authorization) return res.status(401).json({ message: "Token not found!" });

    const [bearer, token] = authorization.split(" ");
    if(!/^Bearer$/i.test(bearer)) return res.status(401).json({ message: "Token malformatted!" });


    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if(err || !decoded) return res.status(401).json({ message: "Invalid token!" });
        
        const user = await authRepository.findById(decoded.id);
        if(!user) return res.status(401).json({ message: "User not found!" });
        
        res.locals.user = user;
        next();
    });
}