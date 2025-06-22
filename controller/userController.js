import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken" // use for authentication
import bcrypt from "bcrypt" // it used to encryption 
import validator from "validator"
import env from "dotenv"
env.config();



// login user
const loginUser = async (req,res) =>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message:"User Doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password);
        
        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }
        const token = createToken(user._id);
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET || "default_secret")
}


// register user
async function registerUser(req, res) {
    const { name, password, email } = req.body;
    try {
        // checking if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // checking the password length
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password: hashedPassword
        });

        const user = await newUser.save(); // Save the new user in the database
        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export {loginUser,registerUser}