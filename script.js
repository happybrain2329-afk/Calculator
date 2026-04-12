const displayMain = document.getElementById('display-main');
const displayHistory = document.getElementById('display-history');

let currentInput = '';
let calculationComplete = false;

function updateDisplay() {
    displayMain.innerText = currentInput || '0';
}

function appendInput(value) {
    if (calculationComplete) {
        currentInput = '';
        calculationComplete = false;
    }
    currentInput += value;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    displayHistory.innerText = '';
    calculationComplete = false;
    updateDisplay();
}

function deleteLastChar() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function calculate() {
    try {
        let sanitized = currentInput.replace(/[^0-9+\-*/.]/g, ''); // Sanitize input
        if (!sanitized) return;

        // Basic check for empty or trailing operator
        if(['+', '-', '*', '/'].includes(sanitized.slice(-1))) {
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
    if (e.key === '*') appendInput('*');
    if (e.key === '/') appendInput('/');
    if (e.key === '.') appendInput('.');
    if (e.key === 'Enter' || e.key === '=') calculate();
    if (e.key === 'Backspace') deleteLastChar();
    if (e.key === 'Escape') clearDisplay();
});

updateDisplay();