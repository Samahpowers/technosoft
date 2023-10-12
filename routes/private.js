import  express  from "express";
import checkAuth  from "../middlewares/checkAuth.js";
import upload from "../middlewares/uploads.js";


import {   
    deleteExam,
    downloadExambasedOnSchoolyearTermsubject, 
    downloadExamsBasedOnSchool,
    privateRoute,
    registerSchool, 
    retrieveAllExams, 
    retrieveAllExamsbySchool, 
    retrieveAllExamsbySubject, 
    retrieveExamsbasedOnSchoolyearTermSubject, 
    uploadExam
    }from "../controllers/private.js"
const router = express.Router()



router.get("/privateRoute"/*,checkAuth*/, privateRoute)
router.post("/registerSchool"/*,checkAuth*/, registerSchool)
router.post("/uploadExam",upload.single("examPaper"),  uploadExam)//th middle paramer is for multer to upload buffer
router.get("/retrieveAllExams", retrieveAllExams)
router.get("/retrieveAllExamsbySubject/:subject", retrieveAllExamsbySubject)
router.get("/retrieveAllExamsbySchool/:school", retrieveAllExamsbySchool)
router.get("/retrieveExam/:school/:year/:term/:subject", retrieveExamsbasedOnSchoolyearTermSubject)
router.get("/downloadExam/:school/:year/:term/:subject", downloadExambasedOnSchoolyearTermsubject);
router.get("/downloadExamsBasedOnSchool/:school/:examId", downloadExamsBasedOnSchool)
router.delete("/deleteExam/:examId", deleteExam)



export default router
