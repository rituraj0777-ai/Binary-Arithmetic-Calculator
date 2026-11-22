// Load saved history from localStorage
let calculationHistory = JSON.parse(
    localStorage.getItem("calculationHistory") || "[]"
);

// Save and display history
function addHistory(text) {

    calculationHistory.unshift(text);

    localStorage.setItem(
        "calculationHistory",
        JSON.stringify(calculationHistory)
    );

    displayHistory();
}

// Display history
function displayHistory() {

    let historyList = document.getElementById("history");

    historyList.innerHTML = "";

    calculationHistory.forEach(function(item) {

        let li = document.createElement("li");

        li.textContent = item;

        historyList.appendChild(li);

    });
}

// Binary Calculator
function calculate(operator) {

    let a = document.getElementById("num1").value.trim();
    let b = document.getElementById("num2").value.trim();

    let result = document.getElementById("result");

    if (a === "" || b === "") {
        result.innerHTML = "Please enter both numbers!";
        return;
    }

    if (!/^[01]+$/.test(a) || !/^[01]+$/.test(b)) {
        result.innerHTML = "Enter valid binary numbers!";
        return;
    }

    let num1 = parseInt(a, 2);
    let num2 = parseInt(b, 2);

    let answer;

    if (operator === "+") {
        answer = num1 + num2;
    }
    else if (operator === "-") {
        answer = num1 - num2;
    }
    else if (operator === "*") {
        answer = num1 * num2;
    }
    else if (operator === "/") {

        if (num2 === 0) {
            result.innerHTML = "Cannot divide by zero!";
            return;
        }

        answer = Math.trunc(num1 / num2);
    }

    let binaryAnswer = answer.toString(2);

    result.innerHTML =
        "Binary Result: " + binaryAnswer +
        "<br>Decimal Result: " + answer;

    addHistory(
        a + " " + operator + " " + b +
        " = " + binaryAnswer
    );
}

// Binary to Decimal Converter
function convertToDecimal() {

    let binary = document.getElementById("binaryInput").value.trim();

    let result = document.getElementById("conversionResult");

    if (binary === "" || !/^[01]+$/.test(binary)) {

        result.innerHTML = "Enter valid binary number!";

        return;
    }

    let decimal = parseInt(binary, 2);

    result.innerHTML =
        "Binary Number: " + binary +
        "<br>Decimal Number: " + decimal;

    addHistory(
        "Binary to Decimal: " + binary +
        " = " + decimal
    );
}

// Decimal to Binary Converter
function convertToBinary() {

    let decimal = document.getElementById("decimalInput").value.trim();

    let result = document.getElementById("binaryResult");

    if (decimal === "" || !/^\d+$/.test(decimal)) {

        result.innerHTML = "Enter a valid positive number!";

        return;
    }

    let binary = BigInt(decimal).toString(2);

    result.innerHTML =
        "Decimal Number: " + decimal +
        "<br>Binary Number: " + binary;

    addHistory(
        "Decimal to Binary: " + decimal +
        " = " + binary
    );
}

// Clear Calculator Inputs
function clearCalculator() {

    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";

    document.getElementById("result").innerHTML =
        "Result will appear here";
}

// Clear All History
function clearHistory() {

    calculationHistory = [];

    localStorage.removeItem("calculationHistory");

    displayHistory();
}

// Show saved history when website opens
displayHistory();