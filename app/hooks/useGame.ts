import { GameStatus } from '../types/game-status'
import { useState } from 'react'
import { gameUtils } from '../utils/gameUtils'

export function useGame(gameStatus?: GameStatus) {
    const [status, setStatus] = useState<GameStatus>(
        gameStatus || gameUtils.newGame()
    )

    return [status]
}
