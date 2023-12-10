import { GameStatus } from '../types/game-status'

export const gameUtils = {
    newGame,
}

function newGame() {
    return {
        turn: 'white',
        black: {
            pieces: [
                { type: 'pawn', rank: 2, file: 'A' },
                { type: 'pawn', rank: 2, file: 'B' },
                { type: 'pawn', rank: 2, file: 'C' },
                { type: 'pawn', rank: 2, file: 'D' },
                { type: 'pawn', rank: 2, file: 'E' },
                { type: 'pawn', rank: 2, file: 'F' },
                { type: 'pawn', rank: 2, file: 'G' },
                { type: 'pawn', rank: 2, file: 'H' },
                { type: 'rook', rank: 1, file: 'A' },
                { type: 'knight', rank: 1, file: 'B' },
                { type: 'bishop', rank: 1, file: 'C' },
                { type: 'queen', rank: 1, file: 'D' },
                { type: 'king', rank: 1, file: 'E' },
                { type: 'bishop', rank: 1, file: 'F' },
                { type: 'knight', rank: 1, file: 'G' },
                { type: 'rook', rank: 1, file: 'H' },
            ],
        },
        white: {
            pieces: [
                { type: 'pawn', rank: 7, file: 'A' },
                { type: 'pawn', rank: 7, file: 'B' },
                { type: 'pawn', rank: 7, file: 'C' },
                { type: 'pawn', rank: 7, file: 'D' },
                { type: 'pawn', rank: 7, file: 'E' },
                { type: 'pawn', rank: 7, file: 'F' },
                { type: 'pawn', rank: 7, file: 'G' },
                { type: 'pawn', rank: 7, file: 'H' },
                { type: 'rook', rank: 8, file: 'A' },
                { type: 'knight', rank: 8, file: 'B' },
                { type: 'bishop', rank: 8, file: 'C' },
                { type: 'queen', rank: 8, file: 'D' },
                { type: 'king', rank: 8, file: 'E' },
                { type: 'bishop', rank: 8, file: 'F' },
                { type: 'knight', rank: 8, file: 'G' },
                { type: 'rook', rank: 8, file: 'H' },
            ],
        },
    } as GameStatus
}
