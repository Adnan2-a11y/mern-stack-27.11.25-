import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Pre-save hook: Hash password before saving. Like salting your fries, but for security.
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();  // Skip if not changed.
  const salt = await bcrypt.genSalt(10);  // 10 rounds – strong but not overkill.
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

const User = mongoose.model('User',userSchema);
export default User;