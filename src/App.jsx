import { useState } from 'react'
import './App.css'

const fullName = 'Joaquin Manalastas'

function CalcDisplay({ value }) {
  return (
    <div
      className={`Display${value === fullName ? ' nameDisplay' : ''}`}
      aria-live='polite'
      aria-label={`Display: ${value}`}
    >
      {value}
    </div>
  )
}

function CalcButton({ buttonLabel, onClick, variant = 'default' }) {
  return (
    <button className={`Button ${variant}`} onClick={onClick} type='button'>
      {buttonLabel}
    </button>
  )
}

function App() {
  const [displayValue, setDisplayValue] = useState('0')
  const [firstOperand, setFirstOperand] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false)

  const calculate = (leftOperand, rightOperand, selectedOperator) => {
    switch (selectedOperator) {
      case '+':
        return leftOperand + rightOperand
      case '-':
        return leftOperand - rightOperand
      case '*':
        return leftOperand * rightOperand
      case '÷':
        return rightOperand === 0 ? 'Error' : leftOperand / rightOperand
      default:
        return rightOperand
    }
  }

  const handleDigit = (digit) => {
    if (waitingForSecondOperand || displayValue === 'Error' || displayValue === fullName) {
      setDisplayValue(digit)
      setWaitingForSecondOperand(false)
      return
    }

    setDisplayValue((currentValue) =>
      currentValue === '0' ? digit : `${currentValue}${digit}`,
    )
  }

  const handleOperator = (nextOperator) => {
    const inputValue = Number(displayValue)
    if (!Number.isFinite(inputValue)) {
      return
    }

    if (firstOperand === null) {
      setFirstOperand(inputValue)
    } else if (operator && !waitingForSecondOperand) {
      const result = calculate(firstOperand, inputValue, operator)
      if (result === 'Error') {
        setDisplayValue(result)
        setFirstOperand(null)
        setOperator(null)
        setWaitingForSecondOperand(true)
        return
      }

      setDisplayValue(String(result))
      setFirstOperand(result)
    }

    setOperator(nextOperator)
    setWaitingForSecondOperand(true)
  }

  const handleEquals = () => {
    if (operator === null || firstOperand === null || waitingForSecondOperand) {
      return
    }

    const result = calculate(firstOperand, Number(displayValue), operator)
    setDisplayValue(String(result))
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecondOperand(true)
  }

  const handleClear = () => {
    setDisplayValue('0')
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecondOperand(false)
  }

  const handleName = () => {
    setDisplayValue(fullName)
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecondOperand(true)
  }

  return (
    <main className='App'>
      <header className='Header'>Calculator of Joaquin Manalastas - IT3A</header>
      <section className='Calculator' aria-label='Calculator'>
        <CalcDisplay value={displayValue} />
        <div className='Keypad'>
          <CalcButton buttonLabel='7' onClick={() => handleDigit('7')} />
          <CalcButton buttonLabel='8' onClick={() => handleDigit('8')} />
          <CalcButton buttonLabel='9' onClick={() => handleDigit('9')} />
          <CalcButton buttonLabel='÷' onClick={() => handleOperator('÷')} variant='operator' />
          <CalcButton buttonLabel='4' onClick={() => handleDigit('4')} />
          <CalcButton buttonLabel='5' onClick={() => handleDigit('5')} />
          <CalcButton buttonLabel='6' onClick={() => handleDigit('6')} />
          <CalcButton buttonLabel='*' onClick={() => handleOperator('*')} variant='operator' />
          <CalcButton buttonLabel='1' onClick={() => handleDigit('1')} />
          <CalcButton buttonLabel='2' onClick={() => handleDigit('2')} />
          <CalcButton buttonLabel='3' onClick={() => handleDigit('3')} />
          <CalcButton buttonLabel='-' onClick={() => handleOperator('-')} variant='operator' />
          <CalcButton buttonLabel='C' onClick={handleClear} variant='utility' />
          <CalcButton buttonLabel='0' onClick={() => handleDigit('0')} />
          <CalcButton buttonLabel='=' onClick={handleEquals} variant='accent' />
          <CalcButton buttonLabel='+' onClick={() => handleOperator('+')} variant='operator' />
        </div>
        <CalcButton buttonLabel='Manalastas' onClick={handleName} variant='name' />
      </section>
    </main>
  )
}

export default App
