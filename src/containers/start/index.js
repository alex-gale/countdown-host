import React from 'react'

import './index.scss'
import Button from '../../components/button'
import StartGameButton from '../../components/start-game-button'
import { SocketContext } from '../../socket-wrapper'

class Start extends React.Component {
	static contextType = SocketContext

  constructor(props) {
    super(props)

    this.state = {
      game_code: ""
    }
  }

  render() {
    return (
      <div className="page-container start-container">
				<h1 className="game-title"><span role="img" aria-label="clock">🕑</span> Countdown Online</h1>
        <StartGameButton
					onClick={() => this.context.connect()}
					gameCode={this.context.gameCode}
					disabled={this.context.loading}
					error={this.context.error}
				/>

				{
					this.context.gameCode &&
					<div className="player-container">
						<h2>Players</h2>
						{this.context.players.map(player => <p className="player" key={player.id}>{player.username}</p>)}
					</div>
				}

				<div className="begin-button-container">
					{
						this.context.players.length > 0
							? <Button onClick={() => this.context.startGame()} disabled={this.context.loading}>
									{this.context.loading ? "Loading..." : "Begin"}
								</Button>
							: null
					}
				</div>
      </div>
    )
  }
}

export default Start
