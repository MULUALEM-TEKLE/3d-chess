import { GameActions } from '../hooks/useGame'
import { GameStatus } from '../types/game-status'
import { Turn } from './components/Turn'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'

type ControlsProps = {
    game: GameStatus
    gameActions: GameActions
}

export function Controls({ game, gameActions }: ControlsProps) {
    return (
        <div className="controls">
            <Turn turn={game.turn} />
            <div className="options">
                <button onClick={gameActions.reset}>
                    <FontAwesomeIcon icon={faArrowsRotate} />
                </button>
            </div>
        </div>
    )
}
