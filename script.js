class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;  //fieldovi za tu klasu
        this.currentOperandTextElement = currentOperandTextElement;   //fieldovi za tu klasu
        this.clear(); 
    }

    clear() {
        this.currentOperand =  ''
        this.previousOperand = ''
        this.operation = undefined          
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1); 
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();  
       }

    chooseOperation(operation) {
        if(this.currentOperand === '') return;
        if(this.previousOperand !== '') {
            this.compute() //will update all variables 
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
    let computation
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if(isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
        case '+':
            computation = prev + current;
        break
        case '-':
            computation = prev - current;
        break
        case '*':
            computation = prev * current;
        break
        case '÷':
            computation = prev / current;
        break
        default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined; 
    this.previousOperand = ''
    }

    updateDisplay() {

        this.currentOperandTextElement.innerText = this.currentOperand //innerText allows to set the text 
        if(this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}` 

        }
    }
        
    percentage () {
        this.currentOperand = this.currentOperand / 100;
}
}
    


const percentageButton = document.querySelector('[data-percentage]')
const numberButtons = document.querySelectorAll('[data-number]') 
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

//definition of class (new calculator), how to create calculator

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click' , () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click' , () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click' , (button) => {
        calculator.compute();
        calculator.updateDisplay();
    })

allClearButton.addEventListener('click' , (button) => {
        calculator.clear();
        calculator.updateDisplay();
    })

deleteButton.addEventListener('click' , (button) => {
        calculator.delete();
        calculator.updateDisplay();
})

percentageButton.addEventListener('click' , (button) => {
    calculator.percentage();
    calculator.updateDisplay();
})
