'use client'
import { Canvas } from '@react-three/fiber'

import './styles/global.scss'
import { Experience } from './experience/Experience'

export default function Home() {
    return (
        <div className="home">
            <Canvas
                camera={{
                    position: [8, 8, 8],
                }}
            >
                <Experience />
            </Canvas>
        </div>
    )
}
