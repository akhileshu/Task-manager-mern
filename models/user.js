import mongoose from 'mongoose'
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    hash: { type: Buffer, required: true },
    name: { type: String,default:'guest' },
    salt: Buffer,
  // You can add more fields as needed for your specific user requirements
});

const User = mongoose.model("User", userSchema);


export default User;
