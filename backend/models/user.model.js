import { Schema, model } from "mongoose";
import crypto from "crypto"; 
import { createHmac } from 'crypto';
import generateToken from "../services/authentication.js"; // Adjust the path as necessar
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
     
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

// Before saving user, hash the password
userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  // Generate salt
  const salt = crypto.randomBytes(16).toString('hex');

  // Hash password with salt
  const hashPassword = crypto.createHmac('sha256', salt)
    .update(user.password)
    .digest('hex');

  user.salt = salt;
  user.password = hashPassword;

  next();
});
userSchema.static("matchPasswordAndGenerateToken",async function (email, password) {
  const user =await this.findOne({ email });
  if (!user)  throw new Error("User Not Found");;
console.log(user);

  const salt = user.salt;
  const hashedPassword = user.password;

  const userProvidedHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
if(hashedPassword!=userProvidedHash) throw new Error("Passwords donot match");
  return token = generateToken(user);
});

const User = model("user", userSchema);

export default User;
