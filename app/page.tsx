'use client'
import { Canvas } from '@react-three/fiber'

import './styles/global.scss'
import { Experience } from './experience/Experience'
import { useGame } from './hooks/useGame'
import { Controls } from './controls/Controls'

export default function Home() {
    const [game, gameActions] = useGame()
    return (
        <div className="home">
            <Controls game={game} gameActions={gameActions} />
            <Canvas>
                <Experience game={game} gameActions={gameActions} />
            </Canvas>
        </div>
    )
}
