'use client'
import { Canvas } from '@react-three/fiber'

import './styles/global.scss'
import { Experience } from './experience/Experience'

export default function Home() {
    return (
        <div className="home">
            <Canvas>
                <Experience />
            </Canvas>
        </div>
    )
}
