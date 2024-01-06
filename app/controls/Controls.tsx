import { useMemo } from 'react'
import { GameActions } from '../hooks/useGame'
import { GameStatus } from '../types/game-status'
import { Data } from './components/Data'
import { Options } from './components/Options'
import { StartMenu } from './components/StartMenu'

type ControlsProps = {
    game: GameStatus
    gameActions: GameActions
}

export function Controls({ game, gameActions }: ControlsProps) {
    const isGameStart = useMemo(() => {
        return game.situation !== 'inactive'
    }, [game.situation])

    return (
        <div className="controls">
            {isGameStart ? (
                <>
                    <Data game={game} />
                    <Options gameActions={gameActions} />
                </>
            ) : (
                <StartMenu gameActions={gameActions} />
            )}
        </div>
    )
}
