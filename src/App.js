import React, { useContext } from 'react'

import './index.scss'
import { SocketContext } from './socket-wrapper'
import Start from './containers/start'
import Round from './containers/round'
import FinalCountdown from './containers/final-countdown'

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

		default:
			return null
	}
}

export default App
