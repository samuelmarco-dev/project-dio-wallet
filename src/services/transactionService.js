import transactionRepository from "../repositories/transactionRepository.js";

async function create(body, id) {
    const { value, description, type } = body;
    if(!value || !description || !type) throw new Error("All fields are required!");

    return await transactionRepository.create({ value, description, type, userId: id });
}

async function findAll(id) {
    return await transactionRepository.findByUser(id);
}

async function updateById(body, { id, userId }) {
    const { value, type, description } = body;
    if(!value || !type || !description) throw new Error("All fields are required!");

    const transactionExists = await transactionRepository.findById(id);
    if(!transactionExists) throw new Error("Transaction not found!");

    const { userId: userIdTransaction } = transactionExists;
    if(userId !== userIdTransaction) throw new Error("You can't update a transaction!");
    else {
        return await transactionRepository.updateById(transactionExists, body);
    }
}

async function deleteById(id, userId) {
    if(!id) throw new Error("Id is required!");
    
    const transactionExists = await transactionRepository.findById(id);
    if(!transactionExists) throw new Error("Transaction not found!");
    
    const { userId: userIdTransaction } = transactionExists;
    if(userId !== userIdTransaction) throw new Error("You can't delete a transaction!");
    else {
        return await transactionRepository.deleteById(id);
    }
}

export default {
    create, 
    findAll,
    deleteById,
    updateById
};