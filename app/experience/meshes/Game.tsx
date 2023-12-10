import { useGame } from '@/app/hooks/useGame'
import { RivalPieces } from './RivalPieces'

export function Game() {
    const [status] = useGame()

    return (
        <>
            <RivalPieces
                pieces={status.black.pieces}
                rival="black"
                isHisTurn={status.turn === 'black'}
            />
            <RivalPieces
                pieces={status.white.pieces}
                rival="white"
                isHisTurn={status.turn === 'white'}
            />
        </>
    )
}
