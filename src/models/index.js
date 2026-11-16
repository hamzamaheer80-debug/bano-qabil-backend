import mongoose from "mongoose";
export { User } from "./user/index.js";
const { Schema, model } = mongoose;
const ref = (name) => ({ type: Schema.Types.ObjectId, ref: name, required: true });