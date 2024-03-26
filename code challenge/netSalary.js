const readline = require("readline");

//store the payee limits and the rates in an object
const payeRates = [
  { min: 0, max: 24000, rate: 0.1 },
  { min: 24000, max: 32333, rate: 0.25 },
  { min: 32334, max: 500000, rate: 0.3 },
  { min: 500001, max: 800000, rate: 0.325 },
  { min: 800000, rate: 0.35 },
];

//store the nhif limits and deduction rates in an object
const nhifRates = [
  { min: 0, max: 5999, deduction: 150 },
  { min: 6000, max: 7999, deduction: 300 },
  { min: 8000, max: 11999, deduction: 400 },
  { min: 12000, max: 14999, deduction: 500 },
  { min: 15000, max: 19999, deduction: 600 },
  { min: 20000, max: 24999, deduction: 750 },
  { min: 25000, max: 29999, deduction: 850 },
  { min: 30000, max: 34999, deduction: 900 },
  { min: 35000, max: 39999, deduction: 950 },
  { min: 40000, max: 44999, deduction: 1000 },
  { min: 45000, max: 49999, deduction: 1100 },
  { min: 50000, max: 59999, deduction: 1200 },
  { min: 60000, max: 69999, deduction: 1300 },
  { min: 70000, max: 79999, deduction: 1400 },
  { min: 80000, max: 89999, deduction: 1500 },
  { min: 90000, max: 99999, deduction: 1600 },
  { min: 100000, deduction: 1700 },
];

const nssfRates = [
  {
    tier1: { min: 0, max: 7000, rate: 0.06 },
    tier2: { min: 7001, max: 36000, rate: 0.06 },
  },
];

//calculates the gross salary inclusive of benefits/ allowances before taxation
function grossSalary(salary, allowance) {
  let grossPay = salary + allowance;
  return grossPay;
}

//calculates the amount that is to be taxed after contribution benefit is removed from gross salary
function taxablePayment(salary, allowance) {
  const contributionBenefit = 1080;
  const theSal = grossSalary(salary, allowance);
  const taxPay = theSal - contributionBenefit;
  return taxPay;
}

//calculates the monthly taxable paye tax
function payee(salary, allowance) {
  const theTax = taxablePayment(salary, allowance);
  let taxRate = 0;
  for (let rate of payeRates) {
    if (theTax >= rate.min && (theTax < rate.max || !rate.max)) {
      taxRate = rate.rate;
    }
  }
  const payTax = (taxRate * theTax) / 100;
  return payTax;
}

//enter the nhif deduction
function nhifDeduction(grossSalary) {
  let nhifDed = 0;
  for (const rate of nhifRates) {
    if (grossSalary >= rate.min && (grossSalary < rate.max || !rate.max)) {
      nhifDed = rate.deduction;
    }
  }
  return nhifDed;
}
//nhifDeduction();

//calculate the nssf deductions
function nssfDeduction(grossSalary) {
  let nssfDed = 0;
  //use the maxPayTier1 for tier 1. However, deduct minPayTier from maxPayTier 2 to get the rate where your salary falls under
  const tier1Pay = nssfRates[0].tier1.max;
  const tier2Pay = nssfRates[0].tier1.max - nssfRates[0].tier1.min;

  //calculate the rate of the pensionable pay paid by the employee in tier 1 and tier2
  const payRateTier1 = (nssfRates[0].tier1.rate * tier1Pay) / 100;
  const payRateTier2 = (nssfRates[0].tier2.rate * tier2Pay) / 100;

  //calculate the totalPayment for tier1 and tier2
  nssfDed = payRateTier1 + payRateTier2;
  return nssfDed;
}
//nssfDeduction();

//calculate the net pay using a function expression by deducting totalDeductions from grossSalary()
const netSalary = function (salary, allowance) {
  const totalDeductions =
    payee(salary, allowance) +
    nhifDeduction(grossSalary(salary, allowance)) +
    nssfDeduction(grossSalary(salary, allowance));
  const newGross = grossSalary(salary, allowance);
  const netPay = newGross - totalDeductions;
  return netPay;
};

//use prompt to enter gross salary and allowances, the program then displays payee, nhif deductions, nssf deductions and net salary
function prompt() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter gross salary: ", (salary) => {
    rl.question("Enter allowances: ", (allowance) => {
      const grossSal = parseFloat(salary);
      const benefits = parseFloat(allowance);
      const payeeAmount = payee(grossSal, benefits);
      const nhifDed = nhifDeduction(grossSal);
      const nssfDed = nssfDeduction(grossSal);
      const netSal = netSalary(grossSal, benefits);

      console.log(`PAYE: ${payeeAmount}`);
      console.log(`NHIF Deduction: ${nhifDed}`);
      console.log(`NSSF Deduction: ${nssfDed}`);
      console.log(`Gross Salary: ${grossSal + benefits}`);
      console.log(`Net Pay: ${netSal}`);

      rl.close();
    });
  });
}
prompt();
