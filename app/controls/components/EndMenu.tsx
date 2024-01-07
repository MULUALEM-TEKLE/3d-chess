import { GameActions } from '@/app/hooks/useGame'

type EndMenuProps = {
    gameActions: GameActions
}

export function EndMenu({ gameActions }: EndMenuProps) {
    return (
        <div className="end-menu">
            <div className="title">Is checkmate</div>
            <button onClick={() => gameActions.startGame()}>Restart</button>
        </div>
    )
}
