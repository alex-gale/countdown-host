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
	}

	render() {
		if (this.props.gameCode && this.state.slide === false) setTimeout(() => this.setState({ slide: true }), 100)

		return (
			<div className="start-game-manager">
				{
					!this.props.gameCode
						? <Button onClick={this.onClick} disabled={this.props.disabled}>
								{this.props.disabled ? 'Loading...' : 'Start Game'}
							</Button>
						: <React.Fragment>
								<div className="code-display">{this.props.gameCode}</div>
								<div className={`url-display ${this.state.slide ? 'display': null}`}>Join at <span className="underline">countdown.codes</span></div>
							</React.Fragment>
				}
			</div>
		)
	}
}

StartGameButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	gameCode: PropTypes.string,
	disabled: PropTypes.bool.isRequired
}

StartGameButton.defaultProps = {
	gameCode: ""
}

export default StartGameButton
