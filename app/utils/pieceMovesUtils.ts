import { ChessFile } from '../types/chess-file'
import { ChessPosition } from '../types/chess-position'
import { ChessRank } from '../types/chess-rank'
import { GameStatus } from '../types/game-status'
import { Moves } from '../types/moves'
import { PieceData } from '../types/piece-data'
import { Rival } from '../types/rival'

export const pieceMovesUtils = {
    getPieceMoves,
}

function getPieceMoves(pieceData: PieceData, gameStatus: GameStatus): Moves {
    switch (pieceData.type) {
        case 'pawn':
            return _getPawnMoves(pieceData, gameStatus)
        default:
            return {
                available: [],
                captures: [],
            }
    }
}

function _getPawnMoves(pieceData: PieceData, gameStatus: GameStatus): Moves {
    const direction = pieceData.rival === 'black' ? 1 : -1
    const fileOptions = _getFileOptions()
    const fileIndex = fileOptions.indexOf(pieceData.file)
    const captures: ChessPosition[] = []
    const available: ChessPosition[] = []
    const nextRank = _getRank(pieceData.rank + direction)
    const doubleNextRank =
        !pieceData.isMoved && _getRank(pieceData.rank + 2 * direction)

    console.log({
        nextRank,
        doubleNextRank,
        fileIndex,
        pieceData,
    })

    const moveRankPosition: ChessPosition | null = nextRank
        ? {
              file: pieceData.file,
              rank: nextRank,
          }
        : null

    if (moveRankPosition && !_positionPiece(moveRankPosition, gameStatus)) {
        available.push(moveRankPosition)

        const doubleMoveRankPosition: ChessPosition | null = doubleNextRank
            ? {
                  file: pieceData.file,
                  rank: doubleNextRank,
              }
            : null

        if (
            !pieceData.isMoved &&
            doubleMoveRankPosition &&
            !_positionPiece(doubleMoveRankPosition, gameStatus)
        ) {
            available.push(doubleMoveRankPosition)
        }
    }

    const leftFile = fileOptions[fileIndex - 1]
    const rightFile = fileOptions[fileIndex + 1]

    const leftPosition: ChessPosition | null =
        leftFile && nextRank
            ? {
                  file: leftFile,
                  rank: nextRank,
              }
            : null

    const rightPosition: ChessPosition | null =
        rightFile && nextRank
            ? {
                  file: rightFile,
                  rank: nextRank,
              }
            : null

    if (rightPosition) {
        const rightPieceRival = _positionPiece(rightPosition, gameStatus)
        if (rightPieceRival && rightPieceRival !== pieceData.rival) {
            captures.push(rightPosition)
        }
    }
    if (leftPosition) {
        const leftPieceRival = _positionPiece(leftPosition, gameStatus)
        if (leftPieceRival && leftPieceRival !== pieceData.rival) {
            captures.push(leftPosition)
        }
    }

    return {
        available: available,
        captures: captures,
    }
}

function _positionPiece(
    position: ChessPosition,
    gameStatus: GameStatus
): Rival | undefined {
    const isBlack = gameStatus.black.pieces.some(
        (piece) => piece.rank === position.rank && piece.file === position.file
    )
    if (isBlack) return 'black'
    const isWhite = gameStatus.white.pieces.some(
        (piece) => piece.rank === position.rank && piece.file === position.file
    )
    if (isWhite) return 'white'
    return undefined
}

function _getFileOptions(): ChessFile[] {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
}

function _getRank(rank: number): ChessRank | undefined {
    return rank < 1 || rank > 8 ? undefined : (rank as ChessRank)
}
