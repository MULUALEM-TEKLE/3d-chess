import { useState } from 'react'
import { GameStatus } from '../types/game-status'
import { gameUtils } from '../utils/gameUtils'
import { PieceData } from '../types/piece-data'
import { ChessPosition } from '../types/chess-position'

export function useGame() {
    const [status, setStatus] = useState<GameStatus>(gameUtils.newGame())

    const movePiece = (selectedPiece: PieceData, position: ChessPosition) => {
        setStatus((prevStatus) => {
            const secondRival =
                selectedPiece.rival === 'white' ? 'black' : 'white'

            return {
                ...prevStatus,
                [selectedPiece.rival]: {
                    ...prevStatus[selectedPiece.rival],
                    pieces: prevStatus[selectedPiece.rival].pieces.map(
                        (piece) => {
                            if (
                                piece.rank === selectedPiece.rank &&
                                piece.file === selectedPiece.file
                            ) {
                                return {
                                    ...piece,
                                    rank: position.rank,
                                    file: position.file,
                                    isMoved: true,
                                }
                            }
                            return piece
                        }
                    ),
                },
                [secondRival]: {
                    ...prevStatus[secondRival],
                    pieces: prevStatus[secondRival].pieces.filter(
                        (piece) =>
                            piece.rank !== position.rank ||
                            piece.file !== position.file
                    ),
                },
                turn: secondRival,
            }
        })
    }

    return [
        status,
        {
            movePiece,
        },
    ] as const
}
