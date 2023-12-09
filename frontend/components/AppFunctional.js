import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import * as yup from "yup"
// Suggested initial states
const URL = 'http://localhost:9000/api/result'


// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {

  const [ message, setMessage ] = useState( initialMessage );
  const [ email, setEmail] = useState(initialEmail); 
  const [steps, setSteps] = useState(initialSteps); 
  const [index, setIndex] = useState(initialIndex); 

  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.


  const getY = () => {
    return Math.floor(index / 3 ) + 1;
  }
  
  const getX = () => {
    return (index % 3) + 1;
  }
  
  function canMoveUp(){
    return index -3 >= 0 ;
  }
  
  function moveUp(){
    if(!canMoveUp()){
      setMessage(`You can't go up`)
      return
    }
    setSteps(steps + 1)
    setIndex(index -3)
    setMessage('')
  }
  
  function canMoveDown(){
    return index +3 <= 8 ; 
  }
  
  function moveDown(){
    if(!canMoveDown()){
      setMessage(`You can't go down`)
      return
    }
    setSteps(steps +1)
    setIndex(index +3)
    setMessage('')
  }
  
  function canMoveLeft(){
    return index % 3 !== 0 
  }

  function moveLeft(){
    if(!canMoveLeft()){
      setMessage(`You can't go left`)
      return
    }
    setSteps(steps +1)
    setIndex(index -1)
    setMessage('')
  }

  function canMoveRight(){
    return index % 3 !==2 ;
  }

  function moveRight(){
    if(!canMoveRight()){
      setMessage(`You can't go right`)
      return
    }
    setSteps(steps +1)
    setIndex(index +1)
    setMessage('')
  }

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

    setValues(initialValues)

    // Use this helper to reset all states to their initial values.
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  function move(evt) {

    const direction = evt.target.id;

    setValues({...values, message:''})
           const newIndex = handleMoveError(direction);
  
           if(newIndex !== values.index){
             let newSteps = values.steps + 1;
            setValues({...values, index: newIndex, steps: newSteps})
  
          }

    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  function onChange(evt) {
    
    const {id, value} = evt.target;
    setValues({...values, [id]: value})

    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
   
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



    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates (2, 2)</h3>
        <h3 id="steps">You moved 0 times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
              {idx === 4 ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button id="left">LEFT</button>
        <button id="up">UP</button>
        <button id="right">RIGHT</button>
        <button id="down">DOWN</button>
        <button id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
