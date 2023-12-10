import { ChessFile } from './chess-file'
import { ChessRank } from './chess-rank'
import { Piece } from './piece'

export type RivalStatus = {
    pieces: Array<{ type: Piece; rank: ChessRank; file: ChessFile }>
}
