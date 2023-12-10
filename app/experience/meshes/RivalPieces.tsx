import { Rival } from '@/app/types/rival'
import { RivalStatus } from '@/app/types/rival-status'
import { Piece } from './Piece'

type RivalPiecesProps = {
    rival: Rival
    isHisTurn: boolean
} & RivalStatus
export function RivalPieces({ rival, isHisTurn, pieces }: RivalPiecesProps) {
    return pieces.map((piece) => {
        return (
            <Piece
                key={`${rival}-${piece.type}-${piece.rank}-${piece.file}`}
                rank={piece.rank}
                file={piece.file}
                piece={piece.type}
                rival={rival}
            />
        )
    })
}
