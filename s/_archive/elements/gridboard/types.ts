
import {Nub} from "../../types.js"

export type Query = () => {
	element: HTMLElement
	draggableItem: HTMLElement
}

export type TriggerInput = ({}: Nub.Data.Key) => void
