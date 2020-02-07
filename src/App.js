import React, { useContext } from 'react'

import './index.scss'
import { SocketContext } from './socket-wrapper'
import Start from './containers/start'
import Round from './containers/round'

const App = () => {
	const { gamestate } = useContext(SocketContext)

  switch (gamestate) {
		case "join_game":
			return (
				<div className="container">
					<Start />
				</div>
			)

		case "round":
			return (
				<div className="container">
					<Round />
				</div>
			)

		default:
			return null
	}
}

export default App
