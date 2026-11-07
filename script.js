// Get the HTML elements
const gradeForm = document.getElementById("grade-form");
const studentName = document.getElementById("student-name");
const prelimInput = document.getElementById("prelim");
const midtermInput = document.getElementById("midterm");
const finalInput = document.getElementById("final");
const result = document.getElementById("result");
const studentList = document.getElementById("student-list");
const emptyMessage = document.getElementById("empty-message");

// Store student records
let students = [];

// Calculate the student's average grade
function calculateAverage(prelim, midterm, finalGrade) {
  return (prelim + midterm + finalGrade) / 3;
}

// Display student records
function displayStudents() {
  studentList.innerHTML = "";

  if (students.length === 0) {
    const message = document.createElement("li");
    message.textContent = "No student records yet.";
    message.id = "empty-message";
    studentList.appendChild(message);
    return;
  }

  students.forEach(function (student) {
    const listItem = document.createElement("li");

    listItem.textContent =
      student.name +
      " | Average: " +
      student.average.toFixed(2) +
      " | Status: " +
      student.status;

    studentList.appendChild(listItem);
  });
}

// Handle form submission
gradeForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get input values
  const name = studentName.value.trim();
  const prelim = Number(prelimInput.value);
  const midterm = Number(midtermInput.value);
  const finalGrade = Number(finalInput.value);

  // Validate grade values
  if (
    !name ||
    !Number.isFinite(prelim) ||
    !Number.isFinite(midterm) ||
    !Number.isFinite(finalGrade) ||
    prelim < 0 ||
    prelim > 100 ||
    midterm < 0 ||
    midterm > 100 ||
    finalGrade < 0 ||
    finalGrade > 100
  ) {
    result.textContent = "Please enter a valid name and grades from 0 to 100.";
    return;
  }

  // Calculate average
  const average = calculateAverage(prelim, midterm, finalGrade);

  // Determine passing status
  const status = average >= 75 ? "Passed" : "Failed";

  // Display result
  result.innerHTML = `
        <p><strong>Student:</strong> ${name}</p>
        <p><strong>Average:</strong> ${average.toFixed(2)}</p>
        <p><strong>Status:</strong> ${status}</p>
    `;

  // Save student record
  const newStudent = {
    name: name,
    average: average,
    status: status,
  };

  students.push(newStudent);

  // Update student list
  displayStudents();

  // Clear form
  gradeForm.reset();
});
