import { usePiecePosition } from '@/app/hooks/usePiecePosition'
import { ChessFile } from '@/app/types/chess-file'
import { ChessPosition } from '@/app/types/chess-position'
import { ChessRank } from '@/app/types/chess-rank'
import { useMemo } from 'react'

type SquareCellProps = {
    isAvailableMove?: boolean
    isCaptureMove?: boolean
    onClick: () => void
} & ChessPosition

export function SquareCell({
    rank,
    file,
    isAvailableMove,
    isCaptureMove,
    onClick,
}: SquareCellProps) {
    const { x, z } = usePiecePosition({ rank, file })

    const color = useMemo(() => {
        const isEvenFile = file.charCodeAt(0) % 2 === 0
        const isEvenRank = rank % 2 === 0
        if (isCaptureMove) return 'red'
        if (isAvailableMove) return 'green'
        return (isEvenFile && !isEvenRank) || (!isEvenFile && isEvenRank)
            ? 'black'
            : 'white'
    }, [rank, file, isAvailableMove, isCaptureMove])

    return (
        <mesh
            rotation-x={-Math.PI * 0.5}
            scale={1}
            position-y={-1}
            position-x={x}
            position-z={z}
            onClick={onClick}
            receiveShadow={true}
        >
            <planeGeometry />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}
