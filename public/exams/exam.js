document.addEventListener("DOMContentLoaded", ()=>{
const exams = document.querySelector(".upload-exams")
const examsWraper = document.querySelector(".exams-wraper")
const aTags = document.querySelectorAll("a")
const examHeaders = document.querySelector(".exam-headers")
const userLogoutBtn =document.querySelector(".logout-admin")
const queryFormcloseIcon = document.querySelector(".icon-close")

const queryString = window.location.search

// Extract the query parameters into an object
const urlParams = new URLSearchParams(queryString);
console.log(urlParams)

// Get the values of userRole and userStatus
const userRole = urlParams.get('userRole');




document.addEventListener("click", (e)=>{
  if(exams.contains(e.target) || examsWraper.contains(e.target)){
    examsWraper.classList.add("active")
  } else{
    examsWraper.classList.remove("active")
     }  
 
})



// Loop through the <a> elements and attach event listeners based on their class names
  aTags.forEach((a) => {
  switch (a.className) {
    case "all":
      a.addEventListener("click", function () {
        // Code to handle the click event for class "eng"
        console.log("All link clicked");
      });
      break;
    case "eng":
      a.addEventListener("click", function () {
        // Code to handle the click event for class "eng"
        console.log("English link clicked");
      });
      break;

    case "chem":
      a.addEventListener("click", function () {
        // Code to handle the click event for class "chem"
        console.log("Chemistry link clicked");
      });
      break;

    case "s/s":
      a.addEventListener("click", function () {
        // Code to handle the click event for class "s/s"
        console.log("Social Studies link clicked");
      });
      break;

    case "geo":
      a.addEventListener("click", function () {
        // Code to handle the click event for class "geo"
        console.log("Geography link clicked");
      });
      break;

    case "phy":
      a.addEventListener("click", function () {
        // Code to handle the click event for class "phy"
        console.log("Physics link clicked");
      });
      break;
    case "specific":
      a.addEventListener("click", ()=>{
        examHeaders.style.display = "block"
      })

    default:
      // Handle other cases or provide a default behavior
      break;
  }
});







//getting/retrieving for retriving exams based on school, year, term and subject
document.getElementById('examForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  // Get form values
  const school = document.getElementById('school').value;
  const subject = document.getElementById('subject').value;
  const year = document.getElementById('year').value;
  const term = document.getElementById('term').value;

  // Construct the URL for the GET request
  const url = `http://localhost:1500/private/retrieveExam/${school}/${year}/${term}/${subject}`;

  try {
    // Make a GET request using fetch and await
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const exams = await response.json();
  console.log(exams)
    // Get the examList container
    const examListContainer = document.getElementById('examList');

    // Clear the previous content
    examListContainer.innerHTML = '';

    // Iterate through the exams and create HTML elements
    exams.forEach((exam) => {
      // Create a div for each exam
      const examDiv = document.createElement('div');

      // Create HTML elements to display exam properties (e.g., subject, year, term)
      const schoolElement = document.createElement('p');
      schoolElement.textContent = `School: ${exam.school}`;
      
      const subjectElement = document.createElement('p');
      subjectElement.textContent = `Subject: ${exam.subject}`;
      
      const yearElement = document.createElement('p');
      yearElement.textContent = `Year: ${exam.year}`;

      const termElement = document.createElement('p');
      termElement.textContent = `Term: ${exam.term}`;

      const examTypeElement = document.createElement('p');
      examTypeElement.textContent = `Mode: ${exam.examType}`;

    

      // Create a download link for the exam
     const downloadLink = document.createElement('a');
    downloadLink.href = `http://localhost:1500/private/downloadExam/${school}/${year}/${term}/${subject}`;
    downloadLink.innerHTML = '<ion-icon name="download-outline"></ion-icon>';
    downloadLink.download = `${subject}.docx`;

      // Append the elements to the examDiv
      examDiv.appendChild(schoolElement);
      examDiv.appendChild(subjectElement);
      examDiv.appendChild(yearElement);
      examDiv.appendChild(termElement);
      examDiv.appendChild(examTypeElement);
      examDiv.appendChild(downloadLink);

      // Append the examDiv to the examList container
      examListContainer.appendChild(examDiv);
      const userStatus = urlParams.get('userStatus');    

    if(userStatus === "active"){
      deleteExamLink.className = "exam-delete"
    }

    });
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
  }


  
});

//getting/retrieving for retriving all exams unconditionally
document.querySelector(".all").addEventListener("click", async()=>{
  const url =`http://localhost:1500/private/retrieveAllExams`
  try {
   const unparsedExams = await fetch (url)
   if(!unparsedExams){
     throw new Error(`HTTP error! Status: ${unparsedExams.status}`);
   }
   const exams = await unparsedExams.json()
  // console.log(exams)
   //get examList container
   const examListContainer = document.getElementById('examList');
  console.log(examListContainer)
   //clear the previous contents of the examListContainer
   examListContainer.innerHTML = '';
   //loop through exams and create html elements for @ exam
   exams.forEach((exam)=>{
   // console.log(exams)
    // create a div for each exam
 const examDiv = document.createElement('div');
  examDiv.className = 'exam-card'; 
    //create html elements to display properties of every exam
    const schoolElement = document.createElement('p');
      schoolElement.textContent = `School: ${exam.school}`;
      
      const subjectElement = document.createElement('p');
      subjectElement.textContent = `Subject: ${exam.subject}`;
      
      const yearElement = document.createElement('p');
      yearElement.textContent = `Year: ${exam.year}`;

      const termElement = document.createElement('p');
      termElement.textContent = `Term: ${exam.term}`;

      const examTypeElement = document.createElement('p');
      examTypeElement.textContent = `Mode: ${exam.examType}`;


    // Create a download link for the exam
const downloadLink = document.createElement('a');
downloadLink.href = `http://localhost:1500/private/downloadExamsBasedOnSchool/${exam.school}/${exam._id}`;
downloadLink.download = 'examPaper.docx';
downloadLink.innerHTML = '<ion-icon name="download-outline"></ion-icon>';


const deleteExamLink = document.createElement('a');
deleteExamLink.href = `http://localhost:1500/private/deleteExam/${exam._id}`;
deleteExamLink.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';





deleteExamLink.addEventListener('click', async (e) => {
  e.preventDefault(); // Prevent the default behavior of following the link

  const confirmation = confirm('Are you sure you want to delete this exam?');
  
  if (confirmation) {
    try {
      const response = await fetch(deleteExamLink.href, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Exam deleted successfully, you can update the UI as needed
        // For example, remove the corresponding examDiv from the page
        examDiv.remove();
      } else {
        // Handle error responses, e.g., show an error message to the user
        console.error('Failed to delete exam.');
      }
    } catch (error) {
      console.error('An error occurred while deleting the exam:', error);
    }
  }
});

// ...

examDiv.appendChild(deleteExamLink); // Append the delete exam link



      examDiv.appendChild(schoolElement);
      examDiv.appendChild(subjectElement);
      examDiv.appendChild(yearElement);
      examDiv.appendChild(termElement);
      examDiv.appendChild(examTypeElement);
      examDiv.appendChild(downloadLink); // Append the download link
      examDiv.appendChild(deleteExamLink); // Append the download link

// Append the examDiv to the examList container
examListContainer.appendChild(examDiv);
 const userStatus = urlParams.get('userStatus');
 
  if(userStatus === "active"){
    downloadLink.className = "exam-download"
  }else if(userStatus === "inactive"){
    deleteExamLink.className = "exam-delete"
  }

   })

  } catch (error) {
    
  }
})


// User logout.....to be created 
userLogoutBtn.addEventListener("click", async () => {
  try {
    const response = await fetch("http://localhost:1500/auth/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status ===200) {
      
      console.log(response.status)
      const data = await response.json();
      
  
      console.log(data); 
       setTimeout(()=>{
        window.location.href = "../main/main.html"
        console.log(`logot successfull`)
        
       },500)
      
      
      
    } else {
      
        console.error("Logout failed:", response.statusText);
      
      
    }
  } catch (error) {
    console.error("Logout error:", error);
  
  }
});

queryFormcloseIcon.addEventListener("click", ()=>{
  examHeaders.style.display = "none"
})





})