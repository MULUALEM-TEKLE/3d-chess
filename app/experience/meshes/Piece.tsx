import { usePiecePosition } from '@/app/hooks/usePiecePosition'
import { ChessFile } from '@/app/types/chess-file'
import { ChessRank } from '@/app/types/chess-rank'
import { Piece as TPiece } from '@/app/types/piece'
import { useMemo } from 'react'
import { pieceUtils } from '../../utils/pieceUtils'
import { Rival } from '@/app/types/rival'
import { PieceModelProps } from '@/app/types/piece-model-props'
import { King } from './pieces/King'
import { Queen } from './pieces/Queen'
import { Bishop } from './pieces/Bishop'
import { Knight } from './pieces/Knight'
import { Rook } from './pieces/Rook'
import { Pawn } from './pieces/Pawn'
import * as THREE from 'three'
import { PieceStatus } from '@/app/types/piece-status'
import { PieceData } from '@/app/types/piece-data'
import { on } from 'events'

export type PieceProps = {
    onPieceClick: (piece: PieceData) => void
} & PieceData

export function Piece({
    rank,
    file,
    type: piece,
    rival,
    isMoved,
    onPieceClick,
}: PieceProps) {
    const { positionX, positionZ } = usePiecePosition(rank, file)

    const props: PieceModelProps = useMemo(() => {
        const { positionY, scale } = pieceUtils.getPieceStats(piece)
        return {
            'position-x': positionX,
            'position-y': positionY,
            'position-z': positionZ,
            scale,
            material: new THREE.MeshStandardMaterial({
                color: rival,
            }),
            onClick: () => {
                onPieceClick({ rank, file, type: piece, rival, isMoved })
            },
        }
    }, [piece, positionX, positionZ, rival, rank, file, onPieceClick])

    switch (piece) {
        case 'king':
            return <King {...props} />
        case 'queen':
            return <Queen {...props} />
        case 'bishop':
            return <Bishop {...props} />
        case 'knight':
            return <Knight {...props} />
        case 'rook':
            return <Rook {...props} />
        case 'pawn':
            return <Pawn {...props} />
        default:
            return null
    }
}