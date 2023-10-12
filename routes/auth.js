import express  from "express";
import { getUsers, login,logout, register } from "../controllers/auth.js";
import checkAuth from "../middlewares/checkAuth.js";
const router = express.Router()

router.post("/register", register)//register function in another file
router.post("/login", login)
router.get("/logout", logout)
router.get("/getUsers", getUsers )


export default router