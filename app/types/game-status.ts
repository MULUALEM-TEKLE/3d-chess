import { RivalStatus } from './rival-status'

export type GameStatus = {
    turn: 'black' | 'white'
    black: RivalStatus
    white: RivalStatus
    isCheck: boolean
}
