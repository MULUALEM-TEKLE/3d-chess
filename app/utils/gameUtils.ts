import { GameStatus } from '../types/game-status'

export const gameUtils = {
    newGame,
}

function newGame() {
    return {
        turn: 'white',
        black: {
            pieces: [
                { type: 'pawn', rank: 6, file: 'A', isMoved: false },
                { type: 'pawn', rank: 2, file: 'B', isMoved: false },
                { type: 'pawn', rank: 2, file: 'C', isMoved: false },
                { type: 'pawn', rank: 2, file: 'D', isMoved: false },
                { type: 'pawn', rank: 2, file: 'E', isMoved: false },
                { type: 'pawn', rank: 2, file: 'F', isMoved: false },
                { type: 'pawn', rank: 2, file: 'G', isMoved: false },
                { type: 'pawn', rank: 2, file: 'H', isMoved: false },
                { type: 'rook', rank: 1, file: 'A', isMoved: false },
                { type: 'knight', rank: 1, file: 'B', isMoved: false },
                { type: 'bishop', rank: 1, file: 'C', isMoved: false },
                { type: 'queen', rank: 1, file: 'D', isMoved: false },
                { type: 'king', rank: 1, file: 'E', isMoved: false },
                { type: 'bishop', rank: 1, file: 'F', isMoved: false },
                { type: 'knight', rank: 1, file: 'G', isMoved: false },
                { type: 'rook', rank: 1, file: 'H', isMoved: false },
            ],
        },
        white: {
            pieces: [
                { type: 'pawn', rank: 7, file: 'A', isMoved: false },
                { type: 'pawn', rank: 7, file: 'B', isMoved: false },
                { type: 'pawn', rank: 7, file: 'C', isMoved: false },
                { type: 'pawn', rank: 7, file: 'D', isMoved: false },
                { type: 'pawn', rank: 7, file: 'E', isMoved: false },
                { type: 'pawn', rank: 7, file: 'F', isMoved: false },
                { type: 'pawn', rank: 7, file: 'G', isMoved: false },
                { type: 'pawn', rank: 7, file: 'H', isMoved: false },
                { type: 'rook', rank: 8, file: 'A', isMoved: false },
                { type: 'knight', rank: 8, file: 'B', isMoved: false },
                { type: 'bishop', rank: 8, file: 'C', isMoved: false },
                { type: 'queen', rank: 8, file: 'D', isMoved: false },
                { type: 'king', rank: 8, file: 'E', isMoved: false },
                { type: 'bishop', rank: 8, file: 'F', isMoved: false },
                { type: 'knight', rank: 8, file: 'G', isMoved: false },
                { type: 'rook', rank: 8, file: 'H', isMoved: false },
            ],
        },
    } as GameStatus
}
