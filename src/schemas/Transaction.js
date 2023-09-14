import { Schema, model } from 'mongoose';

const TransactionSchema = new Schema({
    type: { type: String, required: true },
    value: { type: Number, required: true },
    description: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "users" }, 
    createdAt: { type: Date, default: Date.now() }
});

export default model("transactions", TransactionSchema);