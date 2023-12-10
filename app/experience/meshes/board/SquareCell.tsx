import { usePiecePosition } from '@/app/hooks/usePiecePosition'
import { ChessFile } from '@/app/types/chess-file'
import { ChessRank } from '@/app/types/chess-rank'
import { useMemo } from 'react'

type SquareCellProps = {
    rank: ChessRank
    file: ChessFile
}

export function SquareCell({ rank, file }: SquareCellProps) {
    const { positionX, positionZ } = usePiecePosition(rank, file)

    const color = useMemo(() => {
        const isEvenFile = file.charCodeAt(0) % 2 === 0
        const isEvenRank = rank % 2 === 0
        return (isEvenFile && !isEvenRank) || (!isEvenFile && isEvenRank)
            ? 'black'
            : 'white'
    }, [rank, file])

    return (
        <mesh
            rotation-x={-Math.PI * 0.5}
            scale={1}
            position-y={-1}
            position-x={positionX}
            position-z={positionZ}
        >
            <planeGeometry />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}
