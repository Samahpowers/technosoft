import bcrypt from "bcrypt"
import User from "../model/user.js"
import jwt from "jsonwebtoken"
import { json } from "express"



//Registration function
export const register = async (req, res)=>{ 
 
try {
    if(req.body.password){//
    const salt = bcrypt.genSaltSync(10)
    const hashpassword = bcrypt.hashSync(req.body.password, salt)
    const newUser = new User({
        email: req.body.email,
        phone: req.body.phone,
        password: hashpassword,
        role: req.body.role
    })
        await newUser.save()
        res.status(201).json(`New User Created ! ${newUser}`)//(201)means something is created
    }else{
        res.status(409).json(`Please Provide A Valid Password`)//conflict
    }
    
} catch (error) {
    if (error.code === 11000 && error.keyPattern.email === 1) {
            // Mongoose error code 11000 indicates a duplicate key error
            res.status(409).json("Email address is already in use.");
        } else {
            res.status(500).json(error.message);
        }
}
}//login function
export const login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    console.log(user);
    if (!user) {
      return res.status(404).json(`No User Found`);
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json("Incorrect password");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Set user status to a variable
    const userStatus = user.status;

    // After successfully creating the token, set it in the cookie
    res.cookie("access_token", token, {
      // Options for the cookie
      httpOnly: true, // can be accessed by the server only
    });

    // Send a response indicating successful login
    res.status(200).json({
      username: user.email,
      role: user.role,
      status: user.status,
      message: `Login successful. You are an ${userStatus === 'active' ? 'active' : 'inactive'} user.`,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const logout = (req, res)=>{
  // Clear the "access_token" cookie
  res.clearCookie("access_token");

  // Clear the "adminaccess_token" cookie
  res.clearCookie("admin_access_token");
    res.status(200).json("Logout succeses")
}

//find user
export const getUsers =async (req, res)=>{
  
  
  try {
    const users =await User.find()
    res.status(200).json(users)
  } catch (error) {
    
  }
}

//functions for resources (All CRUD FUNCTIONS)


