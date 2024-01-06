import { Rival } from '@/app/types/rival'

type TurnProps = {
    turn: Rival
}

export function Turn({ turn }: TurnProps) {
    return <div className={`turn ${turn}`}>{turn}</div>
}
