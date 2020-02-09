import React from 'react'
import shortid from 'shortid'

import './index.scss'
import { SocketContext } from '../../socket-wrapper'
import Clock from '../../components/clock'

class Round extends React.Component {
	static contextType = SocketContext

	constructor(props) {
		super(props)

		this.state = {
			clockSecs: 0,
			clockInterval: null,
			playersAnswered: 0
		}

		this.startClock = this.startClock.bind(this)
		this.tickClock = this.tickClock.bind(this)
		this.stopClock = this.stopClock.bind(this)
	}

	componentDidMount() {
		this.startClock()
	}

	startClock() {
		this.setState({ clockInterval: setInterval(this.tickClock, 50) })
	}

	tickClock() {
		if (this.state.clockSecs <= 30) {
			this.setState({ clockSecs: this.state.clockSecs + 0.05 })
		} else {
			this.stopClock()
		}
	}

	stopClock() {
		clearInterval(this.state.clockInterval)
		this.setState({ clockInterval: null })

		this.context.setGamestate("final_countdown")
	}

	render() {
		return (
			<div className="page-container round-container">
				<h1 className="game-title"><span role="img" aria-label="clock">🕧</span> Countdown Online</h1>
				<div className="letters-container">
					{this.context.letters.split("").map(letter => <div className="letter" key={shortid.generate()}>{letter}</div>)}
				</div>

				<div className="round-info">
					<Clock seconds={this.state.clockSecs} />
					<div className="players-answered-container">
						<h1>Players Answered:</h1>
						<p>{this.context.answers.length}</p>
					</div>
				</div>
			</div>
		)
	}
}

export default Round
