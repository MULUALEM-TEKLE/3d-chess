import { ChessRank } from '@/app/types/chess-rank'
import { SquareCell } from './SquareCell'
import { ChessFile } from '@/app/types/chess-file'

export function GameBoard() {
    const board = Array(8).fill([
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
    ]) as Array<Array<ChessFile>>

    return (
        <>
            {board.map((files, rowIndex) => {
                const rank = (rowIndex + 1) as ChessRank
                return files.map((file, fileIndex) => {
                    return (
                        <SquareCell
                            key={`${file}-${rank}`}
                            file={file as ChessFile}
                            rank={rank as ChessRank}
                        />
                    )
                })
            })}
        </>
    )
}
