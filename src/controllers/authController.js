import authService from '../services/authService.js';

async function signUp(req, res) {
    const { body } = req;

    try {
        await authService.signUp(body);
        return res.status(201).send({ message: 'User created successfully' });
    }
    catch(err) {
        const message = { 'Missing fields': 400, 'User already exists': 409 };
        const statusCode = (err.message in message) ? message[err.message] : 500;

        return res.status(statusCode).send({ message: err.message });
    }
}

async function signIn(req, res) {
    const { body } = req;

    try {
        const token = await authService.signIn(body);
        return res.status(200).send({ token });
    } catch (err) {
        const message = { 'Missing fields': 400, 'User not found': 404, 'Invalid password': 401 };
        const statusCode = (err.message in message) ? message[err.message] : 500;

        return res.status(statusCode).send({ message: err.message });
    }
}

async function userLogged(req, res) {
    const user = res.locals.user;

    try {
        return res.send(200).send(user.name);
    } catch (err) {
        const message = { 'User not found': 404 };
        const statusCode = (err.message in message) ? message[err.message] : 500;

        return res.status(statusCode).send({ message: err.message });
    }
}

export default { 
    signUp,
    signIn, 
    userLogged
};