//create a prompt to enter student's marks
const readline = require("readline");

//use an else if statement to grade the marks
function gradeGenerator(marks) {
  if (marks > 79) {
    console.log("Grade: " + "A");
  } else if (marks >= 60 && marks <= 79) {
    console.log("Grade: " + "B");
  } else if (marks >= 49 && marks <= 59) {
    console.log("Grade: " + "C");
  } else if (marks >= 40 && marks <= 49) {
    console.log("Grade: " + "D");
  } else {
    console.log("Grade: " + "E");
  }
}
//gradeGenerator(promptMarks);

function prompt() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter your marks: ", (marks) => {
    gradeGenerator(parseInt(marks));
    rl.close();
  });
}
prompt();
