
import Exam from "../model/exam.js"




export const privateRoute = (req, res)=>{
res.json(`This is a protected route`)
}

export const registerSchool = async (req, res)=>{
   try {
     const school =await School.findOne({
           name:req.body.name
        })
    if(!school){
          const newSchool = new School({
        name:req.body.name,
        subject:req.body.subject,
        file:req.body.file
    })
     await newSchool.save()
     res.status(201).json(`New User Created ! ${newSchool}`)//(201)means something is created
    }
    return res.status(400).json(`school already registered`)
   
    
   } catch (error) {
     return    res.status(500).json(error.message)
   }
}


//uploading function
export const uploadExam = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json("You must select a file");
    }

    // Create a new Exam instance and populate its properties
    const exam = new Exam({
      school:req.body.school,
      subject:req.body.subject,
      year: req.body.year,
      term: req.body.term,
      examPaper: req.file.buffer,
      examType:req.body.examType,
      
     
    });

    // Save the exam to the database using async/await
    const savedExam = await exam.save();

    console.log("Upload successful");
    return res.status(200).json({ message: "Exam uploaded successfully", exam: savedExam });
  } catch (error) {
    console.error("Error uploading exam:", error);
    return res.status(500).json("Error uploading exam");
  }
};


export const retrieveExamsbasedOnSchoolyearTermSubject = async (req, res) => {
  try {
    const school = req.params.school;
    const year = req.params.year;
    const term = req.params.term;
    const subject = req.params.subject;

    // Query the database to find exams based on school, year, term, and subject
    const exams = await Exam.find({
      school,
      year,
      term,
      subject,
    });

    if (exams.length === 0) {
      return res.status(404).send('Exams not found');//if there are no exams
    }

    // Return the array of exams as JSON response
    res.status(200).json(exams);
  } catch (error) {
    console.error('Error fetching exams:', error);
    res.status(500).send('Error fetching exams');
  }
};





// Controller function for retrieving all exams without specific filters
export const retrieveAllExams = async (req, res) => {
     try {
    // Query the database to retrieve all exams
    const exams = await Exam.find();

    // Return the array of exams as JSON response
    res.status(200).json(exams);
  } catch (error) {
    console.error('Error fetching exams:', error);
    res.status(500).send('Error fetching exams');
  }
}

//route for subjects only
export const retrieveAllExamsbySubject =async (req, res)=>{
   try {
    const subject = req.params.subject;
    const exams = await Exam.find({ subject });
    res.status(200).json(exams);
  } catch (error) {
    console.error('Error fetching exams:', error);
    res.status(500).send('Error fetching exams');
  }
}

//route for schools only
export const retrieveAllExamsbySchool =async (req, res)=>{
   try {
    const subject = req.params.school;
    const exams = await Exam.find({ subject });
    res.status(200).json(exams);
  } catch (error) {
    console.error('Error fetching exams:', error);
    res.status(500).send('Error fetching exams');
  }
}

//downloading exams
export const downloadExambasedOnSchoolyearTermsubject = async (req, res) => {
  const { school, year, term, subject } = req.params;
  
  try {
    // Query the MongoDB database to find the exam paper
    const exam = await Exam.findOne({ school, year, term, subject });

    if (!exam) {
      return res.status(404).send('Exam not found');
    }

    // Set the appropriate content type and send the exam paper as a response
    res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Disposition', `attachment; filename=examPaper.docx`);

    res.send(exam.examPaper);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

//Downloading Exams based on school
export const downloadExamsBasedOnSchool = async (req, res)=>{
 const {school, examId} =req.params
 try {
 const exam = await Exam.findOne({ school, _id: examId });
  if(!exam){
    res.status(404).json(`Exams Not Found`)
  }
   res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Disposition', `attachment; filename=examPaper.docx`);

    res.send(exam.examPaper);
 } catch (error) {
  console.error(error);
    res.status(500).send('Server error')
 }
}

export const deleteExam = async (req, res) => {
  const examId = req.params.examId;

  try {
    const deletedExam = await Exam.findByIdAndRemove(examId);

    if (!deletedExam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    // Perform admin-specific checks here (e.g., check if the authenticated user is an admin)

    return res.status(204).json(); // Send a success response with no content
  } catch (error) {
    console.error('Error while removing exam:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



