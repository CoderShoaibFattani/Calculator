// getting DOM node of display screen to print result and expressions
let display = document.getElementById("display");

// creating empty global expression variable, it will store all the values entered by user
let expression = "";

// decimal button getting using dom
let decBtn = document.getElementById("decimal");

// function to update expression variable on clicking buttons
function updateExpression(val) {
  expression += val;
  display.innerText = expression;
}

// function to erase last enterd value by user
function clearOneDigit() {
  expression = expression.slice(0, expression.length - 1);
  display.innerText = expression;
}

function updateDecimal(val) {
  let expNumbers = expression.split(/[-+*/]/);
  for (let i = 0; i < expNumbers.length; i++) {
    if (expNumbers[i].includes(".")) {
      decBtn.disbaled = true;
    } else {
      decBtn.disbaled = false;
      expression += val;
    }
  }
}

function clearDisplay() {
  expression = "";
  display.innerText = "";
}

function calculate() {
  let result;
  try {
    result = evaluateExpression(expression);
    display.innerText = result;
    expression = "";
  } catch (error) {
    display.innerText = "Error";
  }
}

// Function to evaluate the expression
function evaluateExpression(expression) {
  let numbers = expression.split(/[-+*/]/).map(Number);
  let operators = expression.split(/[0-9]+(?:\.[0-9]+)?/).filter(Boolean);
  // Perform multiplication and division operations first
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === "*" || operators[i] === "/") {
      if (operators[i] === "*") {
        numbers[i + 1] = numbers[i] * numbers[i + 1];
      } else if (operators[i] === "/") {
        numbers[i + 1] = numbers[i] / numbers[i + 1];
      }
      operators[i] = null;
      numbers[i] = null; // Mark the current number as null since it has been used in the calculation
    }
  }

  // Filter out null values and remove corresponding operators
  numbers = numbers.filter((num) => num !== null);
  operators = operators.filter((operator) => operator !== null);
  console.log(operators);

  let calculatedResult = numbers[0];

  // Perform addition and subtraction operations
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === "+") {
      calculatedResult = calculatedResult + numbers[i + 1];
    } else if (operators[i] === "-") {
      calculatedResult = calculatedResult - numbers[i + 1];
    }
  }

  return calculatedResult;
}
