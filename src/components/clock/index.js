import React from 'react'
import PropTypes from 'prop-types'

class Clock extends React.PureComponent {
	constructor(props) {
		super(props)

		this.state = {
			sideLength: 400,
			clockInterval: null,
			clockSecs: 0
		}

		this.drawClock = this.drawClock.bind(this)
	}

	drawClock(seconds) {
		if (!this.refs.canvas) return

		const { sideLength } = this.state
		const ctx = this.refs.canvas.getContext("2d")
		const radius = sideLength / 2
		const mid = sideLength / 2
		const pi = Math.PI

		// background circle
		ctx.beginPath()
		ctx.arc(mid, mid, radius, 0, 2 * pi)
		ctx.fillStyle = "white"
		ctx.fill()

		// crosshair
		ctx.beginPath()
		ctx.lineWidth = 3
		ctx.strokeStyle = "#333333"
		ctx.moveTo(mid, mid * 0.1)
		ctx.lineTo(mid, mid * 1.9)
		ctx.moveTo(mid * 0.1, mid)
		ctx.lineTo(mid * 1.9, mid)
		ctx.stroke()

		// outline circle
		ctx.beginPath()
		ctx.lineWidth = 6
		ctx.strokeStyle = "darkblue"
		ctx.arc(mid, mid, radius * 0.9, 0, 2 * pi)
		ctx.stroke()

		// notches
		ctx.beginPath()
		ctx.lineWidth = 3
		ctx.strokeStyle = "#333333"
		// bit of polar coordinates
		const notch_angles = [pi/6, 2*pi/6, 4*pi/6, 5*pi/6, 7*pi/6, 8*pi/6, 10*pi/6, 11*pi/6]
		for (const angle of notch_angles) {
			ctx.moveTo(
				mid + (radius * 0.85) * Math.cos(angle),
				mid - (radius * 0.85) * Math.sin(angle)
			)
			ctx.lineTo(
				mid + (radius * 0.7) * Math.cos(angle),
				mid - (radius * 0.7) * Math.sin(angle)
			)
			ctx.stroke()
		}

		// outer central circle
		ctx.beginPath()
		ctx.fillStyle = "#333333"
		ctx.arc(mid, mid, radius * 0.1, 0, 2 * pi)
		ctx.fill()

		// hand
		ctx.beginPath()
		ctx.fillStyle = "darkblue"
		ctx.strokeStyle = "#333333"
		ctx.lineWidth = 4
		ctx.moveTo(
			mid - (radius * 0.09) * Math.cos((-0.5 * seconds + 7.5) * (pi / 15) - (pi/6)),
			mid + (radius * 0.09) * Math.sin((-0.5 * seconds + 7.5) * (pi / 15) - (pi/6))
		)
		ctx.lineTo(
			mid + (radius * 0.85) * Math.cos((-0.5 * seconds + 7.5) * (pi / 15)),
			mid - (radius * 0.85) * Math.sin((-0.5 * seconds + 7.5) * (pi / 15))
		)
		ctx.lineTo(
			mid + (radius * 0.09) * Math.cos((-0.5 * seconds + 7.5) * (pi / 15) - (pi/6)),
			mid - (radius * 0.09) * Math.sin((-0.5 * seconds + 7.5) * (pi / 15) - (pi/6))
		)
		ctx.stroke()
		ctx.fill()

		// inner central circle
		ctx.beginPath()
		ctx.fillStyle = "darkblue"
		ctx.arc(mid, mid, radius * 0.09, 0, 2 * pi)
		ctx.fill()
	}

	render() {
		this.drawClock(this.props.seconds)

		const { sideLength } = this.state

		return (
			<div className="clock-container">
				<canvas ref="canvas" width={sideLength} height={sideLength} />
			</div>
		)
	}
}

Clock.propTypes = {
	seconds: PropTypes.number.isRequired
}

export default Clock
