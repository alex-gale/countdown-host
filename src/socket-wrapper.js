import React, { useState, useContext } from 'react'

const WS_URL = "wss://api.countdown.codes/ws"

export const SocketContext = React.createContext()
export const useSocket = () => useContext(SocketContext)

export const SocketProvider = ({ children }) => {
	const [gameCode, setGameCode] = useState("")
	const [ws, setWS] = useState()
	const [players, setPlayers] = useState([])
	const [answers, setAnswers] = useState([])
	const [letters, setLetters] = useState("")
	const [gamestate, setGamestate] = useState("join_game")
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	const handleError = (err, webSoc) => {
		setError(err.msg)

		if (err.code.toString()[0] === "1") {
			// treated as player, meaning there is already a host
			setError("Game already in progress")
			return webSoc.close()
		}

		switch (err.code) {
			
		}
	}

	const addPlayer = (p) => {
		const player = { id: p.player_id, username: p.player_username, score: 0, current_answer: "" }

		setPlayers(old_players => [...old_players, player])
	}

	const removePlayer = (playerid) => {
		setPlayers(old_players => [...old_players].filter(player => player.id !== playerid))
	}

	const startGame = () => {
		ws.send(JSON.stringify({ type: "game_start" }))
	}

	const startRound = (letters) => {
		setLetters(letters)
		setGamestate("round")
	}

	const endRound = () => {
		ws.send(JSON.stringify({ type: "round_end" }))
	}

	const playerAnswer = (answer) => {
		let answer_data = [answer.player_id, answer.answer]

		setAnswers(old_answers => [...old_answers, answer_data])
	}

	const connect = () => {
		setError("")
		setLoading(true)

		if (ws) {
			return false
		}

		const webSoc = new WebSocket(WS_URL)

		webSoc.onopen = () => {
			setWS(webSoc)
			setLoading(false)
		}

		webSoc.onmessage = (event) => {
			const message = JSON.parse(event.data)
			const { type, data } = message

			switch (type) {
				case "error":
					handleError(data, webSoc)
					break
				case "game_data":
					if (data.user_type === "player") {
						setError("Game already in progress")
					}

					setGameCode(data.game_code)
					break
				case "player_join":
					addPlayer(data)
					break
				case "player_disconnect":
					removePlayer(data.player_id)
					break
				case "round_start":
					startRound(data.letters)
					break
				case "round_end":
					setGamestate("round_over")
					setLetters("")
					break
				case "player_answer":
					playerAnswer(data)
					break
				default:
					console.error(`Invalid websocket message received - ${type}`)
			}
		}

		webSoc.onclose = () => {
			setWS(null)
			setGamestate("join_game")
			setPlayers([])
			setLetters("")
			setGameCode("")
		}
	}

  return (
    <SocketContext.Provider
			value={{
				gameCode,
				connect,
				players,
				startGame,
				letters,
				gamestate,
				setGamestate,
				error,
				loading,
				answers,
				endRound
			}}
		>
      {children}
    </SocketContext.Provider>
  )
}
