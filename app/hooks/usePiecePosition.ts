import { ChessFile } from '../types/chess-file'
import { ChessRank } from '../types/chess-rank'

export function usePiecePosition(
    rank: ChessRank,
    file: ChessFile
): { positionX: number; positionZ: number } {
    const positionX = file.charCodeAt(0) - 64 - 4
    const positionZ = rank - 4
    return { positionX, positionZ }
}
