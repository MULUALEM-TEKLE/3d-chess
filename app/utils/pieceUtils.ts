import { Piece } from '@/app/types/piece'
import { ChessFile } from '../types/chess-file'
import { ChessRank } from '../types/chess-rank'

export const pieceUtils = {
    getPieceStats,
}

const stats = {
    rook: {
        positionY: -0.42,
        scale: 0.25,
    },
    knight: {
        positionY: -0.3,
        scale: 0.28,
    },
    bishop: {
        positionY: -0.4,
        scale: 0.35,
    },
    queen: {
        positionY: -0.25,
        scale: 0.4,
    },
    king: {
        positionY: 0.2,
        scale: 0.8,
    },
    pawn: {
        positionY: -0.7,
        scale: 0.2,
    },
}

function getPieceStats(piece: Piece) {
    return stats[piece]
}

function moves(piece: Piece, file: ChessFile, rank: ChessRank) {
    switch (piece) {
        case 'rook':
            return movesRook(file, rank)
    }
}

function movesRook(file: ChessFile, rank: ChessRank) {
    const moves = []
    for (let i = 0; i < 8; i++) {
        const files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
        if (i !== rank) moves.push({ file, rank: i + 1 })
        if (files[i] !== file) moves.push({ file: files[i], rank })
    }
    return moves
}

// function movesKnight(file: ChessFile, rank: ChessRank) {
//     const moves = []
//     for (let i = 0; i < 8; i++) {
//         const files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

//     }
//     return moves
// }
