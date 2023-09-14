import TransactionSchema from "../schemas/Transaction.js";

async function create({ value, description, type, userId }) {
    return await TransactionSchema.create({ value, description, type, userId });
}

async function findByUser(id) {
    return await TransactionSchema.find({ userId: id });
}

async function findById(id) {
    return await TransactionSchema.findById(id);
}

async function deleteById(id) {
    return await TransactionSchema.findByIdAndDelete(id);
}

async function updateById(transaction, body) {
   const { value, description, type } = body;

   return await TransactionSchema.findByIdAndUpdate(transaction._id, { value, description, type });
}

export default {
    create, 
    findByUser,
    findById,
    deleteById, 
    updateById
};