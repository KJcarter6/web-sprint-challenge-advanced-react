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

  state = initialState

  canMoveUp = () => {
    return this.state.index - 3 >= 0 ; 
  }

  canMoveDown = () => {
    return this.state.index + 3 <= 8 ; 
  }

  canMoveLeft = () => {
    // return this.state.index !== 0 && this.state.index !== 3 && this.state.index !== 6;
    return this.state.index % 3 !== 0 ;
  }
  canMoveRight = () => {
    return this.state.index % 3 !== 2 ;
  }

  moveUp = () => {
    if(!this.canMoveUp()){
      this.setState({message: `You can't go up`});
      return;
    }
    this.setState({index: this.state.index - 3, message: '', steps: this.state.steps +1})
  }

  moveDown = () => {
    if(!this.canMoveDown()){
      this.setState({message: `You can't go down`});
      return;
    }
    this.setState({index: this.state.index + 3, message: '', steps: this.state.steps +1})
  }

  moveLeft = () => {
    if(!this.canMoveLeft()){
      this.setState({message: "You can't go left" }) ; 
      return;
    }
    this.setState({index: this.state.index -1, message: '', steps: this.state.steps +1})
  }

  moveRight = () => {
    if(!this.canMoveRight()){
      this.setState({message: "You can't go right" }) ; 
      return;
    }
    this.setState({index: this.state.index +1, message: '', steps: this.state.steps +1})
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
    this.setState(initialState)
    // Use this helper to reset all states to their initial values.
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  onChange = (evt) => {

    this.setState( {email: evt.target.value })

    // You will need this to update the value of the input.
  }

  onSubmit = (evt) => {

    evt.preventDefault();
    axios.post('http://localhost:9000/api/result', { x: this.getX(), y: this.getY(), steps: this.state.steps, email: this.state.email } )
    .then(res => {
      this.setState( { message: res.data.message, email: '' } )
    }).catch(err => {
      this.setState( { message: err.response.data.message, email: '' } );
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
