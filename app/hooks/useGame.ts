import { useEffect, useMemo, useState } from 'react'
import { GameStatus } from '../types/game-status'
import { gameUtils } from '../utils/gameUtils'
import { PieceData } from '../types/piece-data'
import { ChessPosition } from '../types/chess-position'
import { pieceMovesUtils } from '../utils/pieceMovesUtils'

export type GameActions = {
    movePiece: (selectedPiece: PieceData, position: ChessPosition) => void
    reset: () => void
}

export function useGame() {
    const [status, setStatus] = useState<GameStatus>(gameUtils.newGame())

    const movePiece = (selectedPiece: PieceData, position: ChessPosition) => {
        setStatus((prevStatus) => {
            return pieceMovesUtils.movePiece(
                selectedPiece,
                prevStatus,
                position
            )
        })
    }

    const reset = () => {
        setStatus(gameUtils.newGame())
    }

    useEffect(() => {
        if (status.isCheck) {
            alert('check')
        }
    }, [status])

    return [
        status,
        {
            movePiece,
            reset,
        } as GameActions,
    ] as const
}
