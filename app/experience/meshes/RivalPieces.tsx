import { Rival } from '@/app/types/rival'
import { RivalStatus } from '@/app/types/rival-status'
import { Piece } from './Piece'
import { PieceData } from '@/app/types/piece-data'
import { useCallback } from 'react'

type RivalPiecesProps = {
    rival: Rival
    isHisTurn: boolean
    onPieceClick: (piece: PieceData) => void
} & RivalStatus
export function RivalPieces({
    rival,
    isHisTurn,
    pieces,
    onPieceClick: _onPieceClick,
}: RivalPiecesProps) {
    const onPieceClick = useCallback(
        (piece: PieceData) => {
            if (isHisTurn) {
                _onPieceClick(piece)
            }
        },
        [_onPieceClick, isHisTurn]
    )

    return pieces.map((piece) => {
        return (
            <Piece
                onPieceClick={onPieceClick}
                key={`${rival}-${piece.type}-${piece.rank}-${piece.file}`}
                rival={rival}
                {...piece}
            />
        )
    })
}