import React, { useContext } from 'react'

import './index.scss'
import { SocketContext } from './socket-wrapper'
import Start from './containers/start'
import Round from './containers/round'
import FinalCountdown from './containers/final-countdown'
import RoundOver from './containers/round-over'
import RoundResults from './containers/round-results'

const App = () => {
	const { gamestate } = useContext(SocketContext)

  switch (gamestate) {
		case "join_game":
			return (
				<div className="container waiting">
					<Start />
				</div>
			)

		case "round":
			return (
				<div className="container round">
					<Round />
				</div>
			)

		case "final_countdown":
			return (
				<div className="container final-countdown">
					<FinalCountdown />
				</div>
			)

		case "round_over":
			return (
				<div className="container round-over">
					<RoundOver />
				</div>
			)

		case "round_results":
			return (
				<div className="container round-results">
					<RoundResults />
				</div>
			)

		default:
			return null
	}
}

export default App
