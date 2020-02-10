import React from 'react'

import './index.scss'
import { SocketContext } from '../../socket-wrapper'

class FinalCountdown extends React.Component {
  static contextType = SocketContext

  constructor(props) {
    super(props)

    this.state = {
      countdownInterval: null,
      countdownSecs: 0
    }

    this.startCountdown = this.startCountdown.bind(this)
    this.tickCountdown = this.tickCountdown.bind(this)
    this.stopCountdown = this.stopCountdown.bind(this)
    this.drawCountdown = this.drawCountdown.bind(this)
  }

  componentDidMount() {
    this.startCountdown()
  }

  componentWillUnmount() {
    this.stopCountdown()
  }

  startCountdown() {
    this.setState({ countdownInterval: setInterval(this.tickCountdown, 50) })
  }

  tickCountdown() {
    if (this.state.countdownSecs <= 5) {
      this.setState({ countdownSecs: this.state.countdownSecs + 0.05 })
      this.drawCountdown(this.state.countdownSecs)
    } else {
      this.stopCountdown()
    }
  }

  stopCountdown() {
    clearInterval(this.state.countdownInterval)
    this.setState({ countdownInterval: null })

    if (this.state.countdownSecs >= 5) {
      this.context.endRound()
    }
  }

  drawCountdown(seconds) {
    const ctx = this.refs.canvas.getContext("2d")
    const sideLength = 150
    const mid = sideLength / 2
    const radius = sideLength / 2
    const pi = Math.PI

    // circle
    ctx.beginPath()
    ctx.lineWidth = 15
    ctx.strokeStyle = "white"
    ctx.arc(mid, mid, radius * 0.85, -pi/2, (2*pi*seconds / 5) - 0.5*pi)
    ctx.stroke()
  }

  render() {
    return (
      <div className="page-container final-countdown-container">
        <h1 className="game-title"><span role="img" aria-label="clock">🕧</span> Countdown Online</h1>

        <h2>Enter your answers!</h2>

        <div className="canvas-container">
          <canvas ref="canvas" width={150} height={150} />
          <p>{5 - Math.floor(this.state.countdownSecs)}</p>
        </div>
      </div>
    )
  }
}

export default FinalCountdown
