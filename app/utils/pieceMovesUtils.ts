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
        case 'knight':
            return _getKnightMoves(pieceData, gameStatus)
        case 'king':
            return _getKingMoves(pieceData, gameStatus)
        case 'bishop':
            return _getBishopMoves(pieceData, gameStatus)
        case 'rook':
            return _getRookMoves(pieceData, gameStatus)
        case 'queen':
            return _getQueenMoves(pieceData, gameStatus)
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

function _getKnightMoves(pieceData: PieceData, gameStatus: GameStatus): Moves {
    const fileOptions = _getFileOptions()
    const fileIndex = fileOptions.indexOf(pieceData.file)
    const captures: ChessPosition[] = []
    const available: ChessPosition[] = []

    const leftFile: ChessFile | undefined = fileOptions[fileIndex - 1]
    const rightFile: ChessFile | undefined = fileOptions[fileIndex + 1]
    const leftLeftFile: ChessFile | undefined = fileOptions[fileIndex - 2]
    const rightRightFile: ChessFile | undefined = fileOptions[fileIndex + 2]
    const nextRank: ChessRank | undefined = _getRank(pieceData.rank + 1)
    const nextNextRank: ChessRank | undefined = _getRank(pieceData.rank + 2)
    const previousRank: ChessRank | undefined = _getRank(pieceData.rank - 1)
    const previousPreviousRank: ChessRank | undefined = _getRank(
        pieceData.rank - 2
    )

    const movesOptions = [
        {
            file: leftFile,
            rank: nextNextRank,
        },
        {
            file: leftFile,
            rank: previousPreviousRank,
        },
        {
            file: rightFile,
            rank: nextNextRank,
        },
        {
            file: rightFile,
            rank: previousPreviousRank,
        },
        {
            file: leftLeftFile,
            rank: nextRank,
        },
        {
            file: leftLeftFile,
            rank: previousRank,
        },
        {
            file: rightRightFile,
            rank: nextRank,
        },
        {
            file: rightRightFile,
            rank: previousRank,
        },
    ].filter((move) => move.file && move.rank) as ChessPosition[]

    movesOptions.forEach((move) => {
        const pieceRival = _positionPiece(move, gameStatus)
        if (pieceRival && pieceRival !== pieceData.rival) {
            captures.push(move)
        } else if (!pieceRival) {
            available.push(move)
        }
    })

    return {
        available,
        captures,
    }
}

function _getKingMoves(pieceData: PieceData, gameStatus: GameStatus): Moves {
    const fileOptions = _getFileOptions()
    const fileIndex = fileOptions.indexOf(pieceData.file)
    const captures: ChessPosition[] = []
    const available: ChessPosition[] = []

    const leftFile: ChessFile | undefined = fileOptions[fileIndex - 1]
    const rightFile: ChessFile | undefined = fileOptions[fileIndex + 1]
    const nextRank: ChessRank | undefined = _getRank(pieceData.rank + 1)
    const previousRank: ChessRank | undefined = _getRank(pieceData.rank - 1)

    const movesOptions = [
        {
            file: leftFile,
            rank: nextRank,
        },
        {
            file: leftFile,
            rank: pieceData.rank,
        },
        {
            file: leftFile,
            rank: previousRank,
        },
        {
            file: pieceData.file,
            rank: nextRank,
        },
        {
            file: pieceData.file,
            rank: previousRank,
        },
        {
            file: rightFile,
            rank: nextRank,
        },
        {
            file: rightFile,
            rank: pieceData.rank,
        },
        {
            file: rightFile,
            rank: previousRank,
        },
    ].filter((move) => move.file && move.rank) as ChessPosition[]

    movesOptions.forEach((move) => {
        const pieceRival = _positionPiece(move, gameStatus)
        if (pieceRival && pieceRival !== pieceData.rival) {
            captures.push(move)
        } else if (!pieceRival) {
            available.push(move)
        }
    })

    return {
        available,
        captures,
    }
}

function _getBishopMoves(pieceData: PieceData, gameStatus: GameStatus): Moves {
    const fileOptions = _getFileOptions()
    const fileIndex = fileOptions.indexOf(pieceData.file)
    const captures: ChessPosition[] = []
    const available: ChessPosition[] = []

    for (let i = 0; i < 8 - fileIndex; i++) {
        const file = fileOptions[fileIndex + i + 1]
        const rank = _getRank(pieceData.rank + i + 1)
        const position: ChessPosition | null =
            file && rank ? { file, rank } : null
        if (position) {
            const pieceRival = _positionPiece(position, gameStatus)
            if (pieceRival && pieceRival !== pieceData.rival) {
                captures.push(position)
                break
            } else if (!pieceRival) {
                available.push(position)
            } else {
                break
            }
        }
    }

    for (let i = 0; i < fileIndex; i++) {
        const file = fileOptions[fileIndex - i - 1]
        const rank = _getRank(pieceData.rank - i - 1)
        const position: ChessPosition | null =
            file && rank ? { file, rank } : null
        if (position) {
            const pieceRival = _positionPiece(position, gameStatus)
            if (pieceRival && pieceRival !== pieceData.rival) {
                captures.push(position)
                break
            } else if (!pieceRival) {
                available.push(position)
            } else {
                break
            }
        }
    }

    for (let i = 0; i < fileIndex; i++) {
        const file = fileOptions[fileIndex - i - 1]
        const rank = _getRank(pieceData.rank + i + 1)
        const position: ChessPosition | null =
            file && rank ? { file, rank } : null
        if (position) {
            const pieceRival = _positionPiece(position, gameStatus)
            if (pieceRival && pieceRival !== pieceData.rival) {
                captures.push(position)
                break
            } else if (!pieceRival) {
                available.push(position)
            } else {
                break
            }
        }
    }

    for (let i = 0; i < 8 - fileIndex; i++) {
        const file = fileOptions[fileIndex + i + 1]
        const rank = _getRank(pieceData.rank - i - 1)
        const position: ChessPosition | null =
            file && rank ? { file, rank } : null
        if (position) {
            const pieceRival = _positionPiece(position, gameStatus)
            if (pieceRival && pieceRival !== pieceData.rival) {
                captures.push(position)
                break
            } else if (!pieceRival) {
                available.push(position)
            } else {
                break
            }
        }
    }

    return {
        available,
        captures,
    }
}

function _getRookMoves(pieceData: PieceData, gameStatus: GameStatus): Moves {
    const fileOptions = _getFileOptions()
    const fileIndex = fileOptions.indexOf(pieceData.file)
    const captures: ChessPosition[] = []
    const available: ChessPosition[] = []

    for (let i = 0; i < 8 - fileIndex; i++) {
        const file = fileOptions[fileIndex + i + 1]
        const position: ChessPosition | null = file
            ? {
                  file,
                  rank: pieceData.rank,
              }
            : null
        if (position) {
            const pieceRival = _positionPiece(position, gameStatus)
            if (pieceRival && pieceRival !== pieceData.rival) {
                captures.push(position)
                break
            } else if (!pieceRival) {
                available.push(position)
            } else {
                break
            }
        }
    }

    for (let i = 0; i < fileIndex; i++) {
        const file = fileOptions[fileIndex - i - 1]
        const position: ChessPosition | null = file
            ? {
                  file,
                  rank: pieceData.rank,
              }
            : null
        if (position) {
            const pieceRival = _positionPiece(position, gameStatus)
            if (pieceRival && pieceRival !== pieceData.rival) {
                captures.push(position)
                break
            } else if (!pieceRival) {
                available.push(position)
            } else {
                break
            }
        }
    }

    for (let i = 0; i < pieceData.rank - 1; i++) {
        const rank = _getRank(pieceData.rank - i - 1)
        const position: ChessPosition | null = rank
            ? {
                  file: pieceData.file,
                  rank,
              }
            : null
        if (position) {
            const pieceRival = _positionPiece(position, gameStatus)
            if (pieceRival && pieceRival !== pieceData.rival) {
                captures.push(position)
                break
            } else if (!pieceRival) {
                available.push(position)
            } else {
                break
            }
        }
    }

    for (let i = 0; i < 8 - pieceData.rank; i++) {
        const rank = _getRank(pieceData.rank + i + 1)
        const position: ChessPosition | null = rank
            ? {
                  file: pieceData.file,
                  rank,
              }
            : null
        if (position) {
            const pieceRival = _positionPiece(position, gameStatus)
            if (pieceRival && pieceRival !== pieceData.rival) {
                captures.push(position)
                break
            } else if (!pieceRival) {
                available.push(position)
            } else {
                break
            }
        }
    }

    return {
        available,
        captures,
    }
}

function _getQueenMoves(pieceData: PieceData, gameStatus: GameStatus): Moves {
    const bishopMoves = _getBishopMoves(pieceData, gameStatus)
    const rookMoves = _getRookMoves(pieceData, gameStatus)
    return {
        available: [...bishopMoves.available, ...rookMoves.available],
        captures: [...bishopMoves.captures, ...rookMoves.captures],
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
