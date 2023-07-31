import React,{useState} from 'react'
import {Container,Screen,Previous,Current,Button} from '../styles/Main'


const Calculator = () => {
    const[current,setCurrent]=useState('');
    const[previous,setPrevious]=useState('');
    const[opeations,setOperations]=useState('');

    const appendValueHandler = (el) =>{
        const value = el.target.getAttribute('data');
        if (value=== '.' && current.includes('.')) return // single . is used during calculation checked

        setCurrent(current + value);
    };

    const deleteHandler = () => {
       setCurrent(String(current).slice(0,-1)) // delete last number
    }
    
    const allClearHandler = () => {   // all data clear
        setCurrent('');
        setOperations('');
        setPrevious('');
    }

    const chooseOpeationHandler = (el) => {
           if(current === '') return;
           if (previous !== '') {
                let value = compute()
                setPrevious(value)
           }
           else {
             setPrevious(current)
           }
           setCurrent('')
           setOperations(el.target.getAttribute('data'))
    };
    const euqalHandler = () => {
        let value=compute()
        if (value === undefined || value == null ) return;
         setCurrent(value);
         setPrevious("");
         setOperations("");
    };

    const compute = () =>{
        let result;
        let previosNumber = parseFloat(previous)
        let currentNumber = parseFloat(current)
        if (isNaN(previosNumber) || isNaN(currentNumber)) return
        switch (opeations){
            case '÷':
                result=previosNumber / currentNumber;
                break;

            case '*':
                result=previosNumber * currentNumber;
                break;
            case '+':
                result=previosNumber + currentNumber;
                break;
            case '-':
                result=previosNumber - currentNumber;
                break;
            default: return
        }
        return result;
    };

  return (
    <>
    <Container>
        <Screen>
            <Previous>{previous} {opeations} </Previous>
            <Current>{current} </Current>
        </Screen>
        <Button onClick={allClearHandler} gridSpan={2} control>AC</Button>
        <Button onClick={deleteHandler} > DEL</Button> 
        <Button data={'÷'} operation onClick={chooseOpeationHandler}>÷</Button>
        <Button data={7} onClick={appendValueHandler}>7</Button>
        <Button data={8} onClick={appendValueHandler}>8</Button>
        <Button data={9} onClick={appendValueHandler}>9</Button>
        <Button data={'*'} operation onClick={chooseOpeationHandler}>*</Button>
        <Button data={4} onClick={appendValueHandler}>4</Button>
        <Button data={5} onClick={appendValueHandler}>5</Button>
        <Button data={6} onClick={appendValueHandler}>6</Button>
        <Button data={'+'} operation onClick={chooseOpeationHandler}>+</Button>
        <Button data={1} onClick={appendValueHandler}>1</Button>
        <Button data={2} onClick={appendValueHandler}>2</Button>
        <Button data={3} onClick={appendValueHandler}>3</Button>
        <Button data={'-'} operation onClick={chooseOpeationHandler}>-</Button>
        <Button data={'.'} decimal onClick={appendValueHandler}>.</Button>
        <Button data={0} onClick={appendValueHandler}>0</Button>
        <Button gridSpan={2} euqals onClick={euqalHandler}>=</Button>
    </Container>
    </>
  )
}

export default Calculator