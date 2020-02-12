import React, { useState, useContext } from 'react'

const WS_URL = "wss://api.countdown.codes/ws"

export const SocketContext = React.createContext()
export const useSocket = () => useContext(SocketContext)

export const SocketProvider = ({ children }) => {
	const [gameCode, setGameCode] = useState("")
	const [ws, setWS] = useState()
	const [players, setPlayers] = useState([])
	const [answerCount, setAnswerCount] = useState(0)
	const [letters, setLetters] = useState("")
	const [gamestate, setGamestate] = useState("join_game")
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const [bestWords, setBestWords] = useState([])

	const handleError = (err, webSoc) => {
		setError(err.msg)

		switch (err.code) {

		}
	}

	const addPlayer = (p) => {
		const player = {
			id: p.player_id,
			username: p.player_username,
			score: 0,
			current_answer: "",
			current_answer_valid: false,
			current_answer_best: false
		}

		setPlayers(old_players => [...old_players, player])
	}

	const removePlayer = (playerid) => {
		setPlayers(old_players => [...old_players].filter(player => player.id !== playerid))
	}

	const startGame = () => {
		ws.send(JSON.stringify({ type: "game_start" }))
		setLoading(true)
		setError("")
	}

	const nextRound = () => {
		ws.send(JSON.stringify({ type: "round_start" }))
		setLoading(true)
		setError("")
	}

	const startRound = (letters) => {
		setLetters(letters)
		setGamestate("round")
		setAnswerCount(0)
		setPlayers(players => {
			players.forEach(player => {
				player.current_answer = ""
			})

			return players
		})
	}

	const processResults = (results) => {
		setBestWords(results.best_words)

		let best_answers = []

		// find best answers
		Object.values(results.valid_answers).forEach(answer => {
			if (best_answers.length === 0 || answer.length === best_answers[0].length) {
				best_answers.push(answer)
			}
			if (answer.length > best_answers[0].length) {
				best_answers = [answer]
			}
		})

		setPlayers(players => {
			players.forEach(player => {
				player.current_answer_valid = Object.keys(results.valid_answers).indexOf(player.id) > -1
				if (best_answers.indexOf(player.current_answer) > -1) {
					player.current_answer_best = true
					player.score += player.current_answer.length
				} else {
					player.current_answer_best = false
				}
			})

			return players
		})
	}

	const endRound = () => {
		ws.send(JSON.stringify({ type: "round_end" }))
	}

	const playerAnswer = (answer) => {
		setAnswerCount(old_count => old_count + 1)

		setPlayers(players => {
			let player = players.find(p => p.id === answer.player_id)
			player.current_answer = answer.answer

			return players
		})
	}

	const connect = () => {
		setError("")
		setLoading(true)

		if (ws) {
			return false
		}

		const webSoc = new WebSocket(`${WS_URL}?type=host`)

		webSoc.onopen = () => {
			setWS(webSoc)
			setLoading(false)
		}

		webSoc.onmessage = (event) => {
			const message = JSON.parse(event.data)
			const { type, data } = message

			setLoading(false)

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
				case "player_answer":
					playerAnswer(data)
					break
				case "round_end":
					setGamestate("round_over")
					break
				case "round_results":
					processResults(data)
					break
				default:
					console.error(`Invalid websocket message received - ${type}`)
			}
		}

		webSoc.onerror = (e) => {
			setError("Unable to connect to the game server")
			setLoading(false)
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
				answerCount,
				endRound,
				nextRound,
				bestWords
			}}
		>
      {children}
    </SocketContext.Provider>
  )
}
