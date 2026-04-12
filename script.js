let displayMain = document.getElementById('display-main');
let currentInput = '0';
let calculationComplete = false;

function updateDisplay() {
    displayMain.textContent = currentInput;
}

function appendInput(value) {
    if (calculationComplete) {
        currentInput = value;
        calculationComplete = false;
    } else if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    calculationComplete = false;
    updateDisplay();
}

function deleteLastChar() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function calculate() {
    try {
        // Sanitize input to only allow digits, operators (+, -, *, /), and decimal points.
        // regex /[^\d+\-*\/.]/g ensures no other character can be evaluated
        const sanitized = currentInput.replace(/[^\d+\-*\/.]/g, '');
        if (!sanitized) return;

        // Basic check for empty or trailing operator
        if(['+', '-', '*', '/'].includes(sanitized.slice(-1))) {
            return; // Don't calculate if trailing operator
        }

        const result = Function('return ' + sanitized)();
        currentInput = result.toString();
        calculationComplete = true;
    } catch (error) {
        currentInput = 'Error';
        setTimeout(() => {
            clearDisplay();
        }, 1500);
    }
    updateDisplay();
}

// Initialize display
updateDisplay();
