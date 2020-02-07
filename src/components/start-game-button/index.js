import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'
import Button from '../button'

class StartGameButton extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			slide: false
		}

		this.onClick = this.onClick.bind(this)
	}

	onClick() {
		this.props.onClick()
		setTimeout(() => this.setState({ slide: true }), 100)
	}

	render() {
		return (
			<div className="start-game-manager">
				{
					!this.props.gameCode
						? <Button onClick={this.onClick}>Start Game</Button>
						: <React.Fragment>
								<div className="code-display">{this.props.gameCode}</div>
								<div className={`url-display ${this.state.slide ? 'display': null}`}>countdown.versefor.me</div>
							</React.Fragment>
				}
			</div>
		)
	}
}

StartGameButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	gameCode: PropTypes.string
}

StartGameButton.defaultProps = {
	gameCode: ""
}

export default StartGameButton
