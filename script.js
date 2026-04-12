let currentInput = '';
let displayMain = document.getElementById('display-main');
let calculationComplete = false; // To reset input after a calculation

function appendInput(value) {
    if (calculationComplete) {
        currentInput = '';
        calculationComplete = false;
    }
    currentInput += value;
    displayMain.innerText = currentInput;
}

function clearDisplay() {
    currentInput = '';
    displayMain.innerText = '0';
    calculationComplete = false;
}

function calculate() {
    if (currentInput === '') {
        return;
    }

    // Basic input sanitization (as per convention document)
    // Allows numbers, operators (+, -, *, /), and decimal point.
    // Prevents multiple operators at the end or invalid characters.
    const sanitizedInput = currentInput.replace(/[^-()\d/*+.]/g, '');

    // Prevent trailing operators
    if (['+', '-', '*', '/'].includes(sanitizedInput.slice(-1))) {
        displayMain.innerText = 'Error';
        setTimeout(() => {
            clearDisplay();
        }, 1500);
        return;
    }

    try {
        // Using Function() for evaluation as per convention document
        const result = Function('return ' + sanitizedInput)();
        currentInput = result.toString();
        displayMain.innerText = currentInput;
        calculationComplete = true;
    } catch (error) {
        displayMain.innerText = 'Error';
        setTimeout(() => {
            clearDisplay();
        }, 1500);
    }
}

// Initialize display
document.addEventListener('DOMContentLoaded', () => {
    if (displayMain) {
        displayMain.innerText = '0';
    }
});