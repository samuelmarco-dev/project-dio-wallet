import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    createAt: { type: Date, default: Date.now() }
});

export default model("users", UserSchema);