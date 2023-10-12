import express from "express"
//import https from "https"
import cors from "cors"
import fs from "fs"
import "dotenv/config"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.js"
import privateRoute from "./routes/private.js"


const app = express()
/*const options = {
  key: "./keys/key.pem",
  cert: "./keys/cert.pem",
};
*/
const PORT = process.env.PORT || 1100



app.use(cookieParser())
app.use(express.json())
app.use(express.static("public"))
app.use(cors())
app.use(express.urlencoded({extended:false}))

app.use("/auth", authRoutes)
app.use("/private", privateRoute)



const connectDb = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB connected`);
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1); // Terminate the application if the database connection fails
    }
};





app.listen(PORT, () => {
   connectDb()
  console.log(`Server is running on https://localhost:${PORT}`);
});