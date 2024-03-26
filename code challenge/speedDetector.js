//calculates the speed of a car to check if they are within the speed limits
//if the car is below the speed limit output "ok"
//if the car is over the speed limit give 1 demerit per every 5 kms
//if demerits are more than 12 print "license suspended"

const readline = require("readline");
let total = 0;

function speedDetect(input) {
  const speedLimit = 70;
  if (input < speedLimit) {
    console.log("ok");
  } else if (input > speedLimit) {
    let demerits = (input - speedLimit) / 5;
    total += demerits;
    console.log(`Demerits: ${demerits}`);
    console.log(`Total Demerits: ${total}`);
  }

  if (`${total}` > 12) {
    console.log("License suspended");
  }
}
//speedDetect();

function prompt() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter the speed: ", (input) => {
    speedDetect(parseInt(input));
    rl.close();
    if (total <= 12) {
      prompt();
    }
  });
}
prompt();
