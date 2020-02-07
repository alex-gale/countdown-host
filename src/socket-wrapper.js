import React, { useState, useContext } from 'react'

const WS_URL = "wss://api.countdown.versefor.me/ws"

export const SocketContext = React.createContext()
export const useSocket = () => useContext(SocketContext)

export const SocketProvider = ({ children }) => {
	const [gameCode, setGameCode] = useState("")
	const [ws, setWS] = useState()
	const [players, setPlayers] = useState([])
	const [letters, setLetters] = useState("")
	const [gamestate, setGamestate] = useState("join_game")

	const handleError = (err) => {

	}

	const addPlayer = (p) => {
		const player = { id: p.player_id, username: p.player_username, score: 0 }

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

	const connect = () => {
		if (ws) {
			return false
		}

		const webSoc = new WebSocket(WS_URL)

		webSoc.onopen = () => {
			setWS(webSoc)
		}

		webSoc.onmessage = (event) => {
			const message = JSON.parse(event.data)
			const { type, data } = message

			switch (type) {
				case "error":
					handleError(data)
					break
				case "game_data":
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
				default:
					console.error("help")
			}
		}

		webSoc.onclose = () => {
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
				gamestate
			}}
		>
      {children}
    </SocketContext.Provider>
  )
}
