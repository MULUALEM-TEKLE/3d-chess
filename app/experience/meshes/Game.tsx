import { RivalPieces } from './RivalPieces'
import { useMemo, useState } from 'react'
import { GameStatus } from '@/app/types/game-status'
import { PieceData } from '@/app/types/piece-data'
import { gameUtils } from '@/app/utils/gameUtils'
import { ChessPosition } from '@/app/types/chess-position'
import { pieceUtils } from '@/app/utils/pieceUtils'
import { type } from 'os'

type GameProps = {
    status: GameStatus
    onPieceClick: (piece: PieceData) => void
}

export function Game({ status, onPieceClick }: GameProps) {
    return (
        <>
            <RivalPieces
                onPieceClick={onPieceClick}
                pieces={status.black.pieces}
                rival="black"
                isHisTurn={status.turn === 'black'}
            />
            <RivalPieces
                onPieceClick={onPieceClick}
                pieces={status.white.pieces}
                rival="white"
                isHisTurn={status.turn === 'white'}
            />
        </>
    )
}
