import Router from "express";
import {userSignup, userSignin} from "../controllers/user.controller.js"; // <-- Also add .js if needed!
const userrouter = Router();

userrouter.post("/signup", userSignup);
userrouter.post("/signin",userSignin);

export default userrouter; 
