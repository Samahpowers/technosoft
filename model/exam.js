import mongoose from "mongoose"
const {Schema }= mongoose
const ExamSchema = new Schema({
  
    examPaper:{
        type: Buffer,
        unique: true
    },
    school:String,    
    year: String,
    term: String,
    subject:String,
    examType: {
        type:String,
        enum: ["cat","prediction", "termExam"]
    }
  
    
})

export default mongoose.model("Exam", ExamSchema)
