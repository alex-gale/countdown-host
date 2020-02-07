import React from 'react'

import './index.scss'
import Button from '../../components/button'

class Start extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      started: true,
      game_code: 0
    }
  }

  startGame() {
    
  }

  render() {
    return (
      <div className="page-container start-container">
        <Button>Start Game</Button>
      </div>
    )
  }
}

export default Start
