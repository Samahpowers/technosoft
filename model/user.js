import mongoose from "mongoose"
const {Schema}  = mongoose
// create a new schema from mongoose
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: [true, "User Already Exist"]
    },
    phone: {
        type: Number,
        required: true,
        
    },
    password: {
        type: String,
        required: true,
       
    },
   role: {
    type: String,
    enum: ['user', 'admin'], // Define allowed roles
    default: 'user' // Set the default role to 'user'
  },
  status:{
    type:String,
    enum: ["active", "inactive"],
    default: "inactive"
  }
})

export default mongoose.model("User", userSchema)//this will convert the new schema into model and exports it
