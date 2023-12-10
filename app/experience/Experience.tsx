import { OrbitControls } from '@react-three/drei'
import { Lights } from './Lights'
import { GameBoard } from './meshes/board/GameBoard'
import { Game } from './meshes/Game'

export function Experience() {
    return (
        <>
            <OrbitControls />
            <Lights />
            <GameBoard />
            <Game />
        </>
    )
}
