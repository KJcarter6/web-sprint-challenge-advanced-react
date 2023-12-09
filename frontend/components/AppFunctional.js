import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import * as yup from "yup"
// Suggested initial states
const URL = 'http://localhost:9000/api/result'

const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4// the index the "B" is at




const initialValues = {
  message: initialMessage,
  email: initialEmail,
  steps: initialSteps,
  index: initialIndex,
}

// const left=""
// const up=""
// const right=""
// const down=""

// const initialErrors = {
//   left:left,
//   up:up,
//   right:right,
//   down:down,
// }




export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [values, setValues] = useState(initialValues)
  //const [errors, setErrors] = useState(initialErrors)

  function getXY() {

    const x = (values.index % 3) + 1;
         const y = Math.floor(values.index / 3) +1;
        
         return { x, y };
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  function getXYMessage() {
    const {x,y} = getXY(values.index);
        return `Coordinates (${x}, ${y})`
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }


  function reset() {
    // Use this helper to reset all states to their initial values.
      setValues(initialValues)

  }







function handleMoveError(direction) {
  const currIndex = values.index;
  let newIndex = currIndex;

  if (direction === 'left' && currIndex % 3 !== 0) {
    newIndex = currIndex - 1;
  } else if (direction === 'left') {
    setValues({ ...values, message: "You can't go left" });
  }

  if (direction === 'up' && currIndex >= 3) {
    newIndex = currIndex - 3;

  } else if (direction === 'up') {
    setValues({ ...values, message: "You can't go up" });
  }

  if (direction === 'right' && currIndex % 3 !== 2) {
    newIndex = currIndex + 1;
  } else if (direction === 'right') {
    setValues({ ...values, message: "You can't go right" });
  }

  if (direction === 'down' && currIndex <= 5) {
    newIndex = currIndex + 3;
  } else if (direction === 'down') {
    setValues({ ...values, message: "You can't go down" });
  }


  return newIndex;
}

function move(evt) {

  const direction = evt.target.id;

  setValues({...values, message:''})
         const newIndex = handleMoveError(direction);

         if(newIndex !== values.index){
           let newSteps = values.steps + 1;
          setValues({...values, index: newIndex, steps: newSteps})

        }


}





  function onChange(evt) {
    const {id, value} = evt.target;
         setValues({...values, [id]: value})



  }




  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault()
    const { x, y } = getXY();

    const newValue = {
      x:x,
      y:y,
      steps: values.steps,
      email: values.email
    }

    axios.post(URL, newValue)
    .then(res =>{
        setValues({...values, message: res.data.message, email:''})


    }).catch(err =>{

      console.error(err.response.data.message)
      setValues({...values, message: err.response.data.message})

    })


  }
   function stepValue(){
    if(values.steps > 1 || values.steps === 0){
      return `${values.steps} times`
    } else{
      return `${values.steps} time`
    }
  }



  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Corrdinates {getXYMessage()}</h3>
        <h3 id="steps">You moved {stepValue()}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === values.index ? ' active' : ''}`}>
              {idx === values.index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{values.message}</h3>
      </div>
      <div id="keypad">
        <button onClick={move} id="left"  >LEFT</button>
        <button onClick={move}id="up" >UP</button>
        <button onClick={move} id="right" >RIGHT</button>
        <button onClick={move}id="down" >DOWN</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>

        <input id="email" type="email" placeholder="type email" onChange={onChange} value={values.email} ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
      }
