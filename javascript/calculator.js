let buffer = '0'
let runningTotal = 0
let previousOperator = null

const screen = document.querySelector('.screen')

function buttonClick (value) {
    if (isNaN(parseInt(value)))
        handleSymbol(value)
    else
        handleNumber(value)

    rerender()
}

function handleNumber (number) {
    if (buffer === '0')
        buffer = number
    else
        buffer += number
}

function handleSymbol (symbol) {
    switch (symbol) {
        case 'C' :
            handleClear()
            break
        case '=' :
            handleEquals()
            break
        case '←' :
            handleBackspace()
            break
        case '+' :
        case '-' :
        case '÷' :
        case '×' :
            handleMath(symbol)
            break
    }
}

function handleClear() {
    buffer = '0'
}

function handleEquals() {
    if (previousOperator === null)
        return // do nothing

    flushOperation(parseInt(buffer))
    previousOperator = null

    buffer = "" + runningTotal // maintain buffer as type string
    runningTotal = 0
}

function handleBackspace() {
    if (buffer.length === 1)
        buffer = '0'
    else
        buffer = buffer.substring(0, buffer.length - 1)
}

function handleMath(mathSymbol) {
    if (buffer === '0')
        return // do nothing

    const intBuffer = parseInt(buffer)
    
    if (runningTotal === 0) 
        runningTotal = intBuffer 
    else
        flushOperation(intBuffer)

    previousOperator = mathSymbol
    buffer = '0'
}

function flushOperation (intBuffer) {
    switch (previousOperator) {
        case '+' :
            runningTotal += intBuffer
            break
        case '-' :
            runningTotal -= intBuffer
            break
        case '÷' :
            runningTotal /= intBuffer
            break
        case '×' :
            runningTotal *= intBuffer
            break
    }
}

function init () {
    document.querySelector('.calc-buttons')
        .addEventListener("click", function(event){
            buttonClick(event.target.innerText)
        })
}

function rerender () {
    screen.innerText = buffer
}

init()

