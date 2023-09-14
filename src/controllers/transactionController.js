import transactionService from "../services/transactionService";

async function create(req, res) {
    const { body } = req;
    const { _id: id } = res.locals.user;
    
    try {
        const transaction = await transactionService.create(body, id);
        return res.status(201).json(transaction);
    } catch(err) {
        return res.status(400).json({ message: err.message });
    }
}

async function findByUser(req, res) {
    const { _id: id } = res.locals.user;
    
    try {
        const arrTransactions = await transactionService.findAll(id);
        return res.status(200).json(arrTransactions);
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
}

async function updateById(req, res) {
    const { body } = req;
    const { _id: userId } = res.locals.user;
    const { id } = req.params;

    try {
        await transactionService.updateById(body, { id, userId });
        return res.status(204).end();
    } catch (err) {
        const message = { 'All fields are required!': 400, 'Transaction not found!': 404, 'You can\'t update a transaction!': 401 };
        const statusCode = (err.message in message) ? message[err.message] : 500;

        return res.status(statusCode).json({ message: err.message });
    }
}

async function deleteById(req, res) {
    const { _id: userId } = res.locals.user;
    const { id } = req.params;

    try {
        await transactionService.deleteById(id, userId);
        return res.status(204).end();
    }
    catch(err) {
        const message = { 'Id is required!': 400, 'Transaction not found!': 404, 'You can\'t delete a transaction!': 401 };
        const statusCode = (err.message in message) ? message[err.message] : 500;

        return res.status(statusCode).json({ message: err.message });
    }
}

export default {
    create,
    findByUser,
    deleteById,
    updateById
};