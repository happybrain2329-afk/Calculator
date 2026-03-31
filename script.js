const displayMain = document.getElementById('display-main');
const displayHistory = document.getElementById('display-history');

let currentInput = "0";
let calculationComplete = false;

function updateDisplay() {
    displayMain.value = currentInput;
}

function appendInput(char) {
    if (calculationComplete && !isNaN(char)) {
        currentInput = char; 
        calculationComplete = false;
    } else {
        if (currentInput === "0" && !isNaN(char)) {
            currentInput = char;
        } else {
            // Prevent two operators in a row
            const lastChar = currentInput.slice(-1);
            if (['+', '-'].includes(char) && ['+', '-'].includes(lastChar)) {
                currentInput = currentInput.slice(0, -1) + char;
            } else {
                currentInput += char;
            }
        }
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = "0";
    displayHistory.innerText = "0";
    calculationComplete = false;
    updateDisplay();
}

function deleteLastChar() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = "0";
    }
    updateDisplay();
}

function calculate() {
    try {
        // Sanitize input to only allow digits, +, and -
        // regex /[^\d+-]/g ensures no other character can be evaluated
        const sanitized = currentInput.replace(/[^\d+-]/g, '');
        if (!sanitized) return;

        // Basic check for empty or trailing operator
        if(['+', '-'].includes(sanitized.slice(-1))) {
            return; // Don't calculate if trailing operator
        }

        // Perform calculation safely
        const result = Function(`"use strict"; return (${sanitized})`)();
        
        displayHistory.innerText = currentInput;
        currentInput = String(result);
        calculationComplete = true;
        updateDisplay();
    } catch (e) {
        currentInput = "Error";
        updateDisplay();
        setTimeout(clearDisplay, 1500);
    }
}

// Add Keyboard Support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendInput(e.key);
    if (e.key === '+') appendInput('+');
    if (e.key === '-') appendInput('-');
    if (e.key === 'Enter' || e.key === '=') calculate();
    if (e.key === 'Backspace') deleteLastChar();
    if (e.key === 'Escape') clearDisplay();
});
