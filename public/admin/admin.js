document.addEventListener("DOMContentLoaded", ()=>{
const exams = document.querySelector(".upload-exams")
const examsWraper = document.querySelector(".exams-wraper")
const aTags = document.querySelectorAll("a")
console.log
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

    default:
      // Handle other cases or provide a default behavior
      break;
  }
});

document.getElementById('examForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get form values
    const school = document.getElementById('school').value;
    const subject = document.getElementById('subject').value;
    const year = document.getElementById('year').value;
    const term = document.getElementById('term').value;    
    const examType = document.querySelector('input[name="examType"]:checked').value;

          

    const formData = new FormData();
    formData.append('school', school);
    formData.append('subject', subject);
    formData.append('year', year);
    formData.append('term', term);
    formData.append('examType', examType);

    const fileInput = document.getElementById('file');
    formData.append('examPaper', fileInput.files[0]);

    try {
        const response = await fetch('http://localhost:1500/private/uploadExam', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Display success message
        
          const successMessage = document.getElementById('successMessage');
          successMessage.innerHTML = 'Exam uploaded successfully';
          successMessage.style.color="green"
        setTimeout(()=>{
          successMessage.style.display="none"
          
        },1000)

        // Reset the form
        document.getElementById('examForm').reset();
    } catch (error) {
        console.error('Error uploading exam:', error);
        alert('Error uploading exam');
    }
});

})