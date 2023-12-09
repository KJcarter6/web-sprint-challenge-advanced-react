import React from 'react'
import axios from 'axios'


// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

export default class AppClass extends React.Component {
  constructor(){
    super()
    this.state = {
      values: initialState
    }
  }
    getXY = () => {
      const x = (this.state.values.index % 3) + 1;
      const y = Math.floor(this.state.values.index / 3) +1;

      return { x, y }

    }
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  getY = () => {
    return Math.floor(this.state.index / 3 ) + 1;
  }
  getX = () => {
    return (this.state.index % 3) + 1;
  }

  getXY = () => {
    return `${ this.getX() }, ${ this.getY() }`
    
  }
 

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  reset = () => {
    this.setState({values: initialState});
    // Use this helper to reset all states to their initial values.
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }



  handleMoveError = (direction) => {
    const currIndex = this.state.values.index;
    let newIndex = currIndex;

    if (direction === 'left' && currIndex % 3 !== 0) {
      newIndex = currIndex - 1;
    } else if (direction === 'left') {
      this.setState({ values: { ...this.state.values, message: "You can't go left" } });
    }

    if (direction === 'up' && currIndex >= 3) {
      newIndex = currIndex - 3;

    } else if (direction === 'up') {
      this.setState({ values: { ...this.state.values, message: "You can't go up" } });
    }

    if (direction === 'right' && currIndex % 3 !== 2) {
      newIndex = currIndex + 1;
    } else if (direction === 'right') {
      this.setState({ values: { ...this.state.values, message: "You can't go right" } });
    }

    if (direction === 'down' && currIndex <= 5) {
      newIndex = currIndex + 3;
    } else if (direction === 'down') {
      this.setState({ values: { ...this.state.values, message: "You can't go down" } });
    }


    return newIndex;
  }




  move = (evt) => {


    const direction = evt.target.id;

    this.setState({ values: { ...this.state.values, message: "" } });
           const newIndex = this.handleMoveError(direction);

           if(newIndex !== this.state.values.index){
             let newSteps = this.state.values.steps + 1;
             this.setState({ values: { ...this.state.values, index: newIndex, steps: newSteps } });
    }


    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  onChange = (evt) => {

    const {id, value} = evt.target;
    this.setState({ values: { ...this.state.values, [id]: value } });

    // You will need this to update the value of the input.
  }

  onSubmit = (evt) => {

    evt.preventDefault()
    const { x, y } = this.getXY();

    const newValue = {
      x:x,
      y:y,
      steps: this.state.values.steps,
      email: this.state.values.email,
    }

    axios.post(URL, newValue)
    .then(res =>{
       // this.setState((prevState)=>({ values: {...prevState.values, message: res.data.message, email:''}}))
       this.setState({ values: {...this.state.values, message: res.data.message, email:''}})

    }).catch(err =>{

      console.error(err.response.data.message)
      this.setState({values:{...this.state.values, message: err.response.data.message}})

    })
    
    // Use a POST request to send a payload to the server.
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
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
}
