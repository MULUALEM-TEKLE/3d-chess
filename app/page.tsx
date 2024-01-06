'use client'
import { Canvas } from '@react-three/fiber'

import './styles/global.scss'
import { Experience } from './experience/Experience'
import { useGame } from './hooks/useGame'
import { Controls } from './controls/Controls'
import { useMemo } from 'react'

export default function Home() {
    const [game, gameActions] = useGame()

    const isGameStart = useMemo(() => {
        return game.situation !== 'inactive'
    }, [game.situation])

    return (
        <div className={`home ${isGameStart ? 'start' : ''}`}>
            <Controls game={game} gameActions={gameActions} />
            <Canvas>
                <Experience game={game} gameActions={gameActions} />
            </Canvas>
        </div>
    )
}
