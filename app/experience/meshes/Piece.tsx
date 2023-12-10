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

export type PieceProps = {
    rank: ChessRank
    file: ChessFile
    piece: TPiece
    rival: Rival
}

export function Piece({ rank, file, piece, rival }: PieceProps) {
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
        }
    }, [piece, positionX, positionZ, rival])

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
