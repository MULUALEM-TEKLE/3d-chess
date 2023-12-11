import { OrbitControls } from '@react-three/drei'
import { Lights } from './Lights'
import { GameBoard } from './meshes/board/GameBoard'
import { Game } from './meshes/Game'
import { pieceUtils } from '../utils/pieceUtils'
import { ChessPosition } from '../types/chess-position'
import { GameStatus } from '../types/game-status'
import { gameUtils } from '../utils/gameUtils'
import { PieceData } from '../types/piece-data'
import { useEffect, useMemo, useState } from 'react'
import { Moves } from '../types/moves'

export function Experience() {
    const [selectedPiece, setSelectedPiece] = useState<PieceData | null>(null)
    const [status, setStatus] = useState<GameStatus>(gameUtils.newGame())

    const moves: Moves | undefined = useMemo(() => {
        if (!selectedPiece) return undefined
        return pieceUtils.getMoves(selectedPiece, status)
    }, [selectedPiece, status])

    return (
        <>
            <OrbitControls />
            <Lights />
            <GameBoard moves={moves} />
            <Game status={status} onPieceClick={setSelectedPiece} />
        </>
    )
}
