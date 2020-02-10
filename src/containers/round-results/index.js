import React from 'react'

import './index.scss'
import { SocketContext } from '../../socket-wrapper'
import Button from '../../components/button'

class RoundResults extends React.Component {
	static contextType = SocketContext

	render() {
		const players = [...this.context.players]
		const sortedPlayers = players.sort((a, b) => {
			if (a.current_answer.length < b.current_answer.length) {
				return 1
			}
			if (a.current_answer.length > b.current_answer.length) {
				return -1
			}
			return 0
		})

		return (
			<div className="page-container round-results-container">
				<h1 className="game-title"><span role="img" aria-label="clock">🕧</span> Countdown Online</h1>

				<div className="results-container">
					<div className="player-words">
						<h2>Round Results:</h2>
						{
							sortedPlayers.map(player => (
								<div className="player-result" key={player.id}>
									<p>{player.username}</p>
									<p>{player.current_answer}</p>
								</div>
							))
						}
					</div>

					<div className="best-words">
						<h2>Best Words:</h2>
						<div className="word">
							lambacopter
						</div>
					</div>
				</div>

				<div className="next-round-container">
					<Button onClick={() => this.context.nextRound()}>Next Round</Button>
				</div>
			</div>
		)
	}
}

export default RoundResults
