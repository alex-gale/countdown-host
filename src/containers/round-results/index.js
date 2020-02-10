import React from 'react'
import shortid from 'shortid'

import './index.scss'
import { SocketContext } from '../../socket-wrapper'
import Button from '../../components/button'

class RoundResults extends React.Component {
	static contextType = SocketContext

	constructor(props) {
		super(props)

		this.state = {
			pointsChangeDisplay: false
		}
	}

	componentDidMount() {
		setTimeout(() => this.setState({ pointsChangeDisplay: true }), 200)
	}

	render() {
		const players = [...this.context.players]
		const sortedPlayers = players.sort((a, b) => {
			if (a.score < b.score) return 1
			if (a.score > b.score) return -1
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
									<p className={`player-username ${player.current_answer ? null : 'greyed'}`}>{player.username}</p>
									<p className={`player-answer ${player.current_answer_valid ? null : 'strike'}`}>{player.current_answer}</p>
									<p className="player-score">{player.score}</p>
									<p className={`player-points-change ${this.state.pointsChangeDisplay ? 'display' : null}`}>
										{player.current_answer_best ? `+${player.current_answer.length}` : null}
									</p>
								</div>
							))
						}
					</div>

					<div className="best-words">
						<div className="letters-container">
							{this.context.letters.split("").map(letter => <div className="letter" key={shortid.generate()}>{letter}</div>)}
						</div>

						<div className="words-container">
							{this.context.bestWords.map(word => <p key={shortid.generate()}>{word}</p>)}
						</div>
					</div>
				</div>

				<div className="next-round-container">
					<span className={`error-message ${this.context.error && "display"}`}>{this.context.error}</span>
					<Button onClick={() => this.context.nextRound()} disabled={this.context.loading}>
						{this.context.loading ? "Loading..." : "Next Round"}
					</Button>
				</div>
			</div>
		)
	}
}

export default RoundResults
