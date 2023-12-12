import { OrbitControls } from '@react-three/drei'
import { Lights } from './Lights'
import { GameBoard } from './meshes/board/GameBoard'
import { Game } from './meshes/Game'
import { pieceUtils } from '../utils/pieceUtils'
import { ChessPosition } from '../types/chess-position'
import { GameStatus } from '../types/game-status'
import { gameUtils } from '../utils/gameUtils'
import { PieceData } from '../types/piece-data'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Moves } from '../types/moves'
import { useGame } from '../hooks/useGame'

export function Experience() {
    const [selectedPiece, setSelectedPiece] = useState<PieceData | null>(null)
    const [game, gameActions] = useGame()

    const moves: Moves | undefined = useMemo(() => {
        if (!selectedPiece) return undefined
        return pieceUtils.getMoves(selectedPiece, game)
    }, [selectedPiece, game])

    const toggleSelectedPiece = (pieceData: PieceData) => {
        if (
            selectedPiece &&
            selectedPiece.file === pieceData.file &&
            selectedPiece.rank === pieceData.rank
        ) {
            setSelectedPiece(null)
        } else {
            setSelectedPiece(pieceData)
        }
    }

    const movePiece = useCallback(
        (position: ChessPosition) => {
            if (!selectedPiece) return
            gameActions.movePiece(selectedPiece, position)
            setSelectedPiece(null)
        },
        [selectedPiece, gameActions]
    )

    return (
        <>
            <OrbitControls />
            <Lights />
            <GameBoard movePiece={movePiece} moves={moves} />
            <Game status={game} onPieceClick={toggleSelectedPiece} />
        </>
    )
}
