
import {NubDetail} from "../../events/types/detail.js"

export type Query = () => {
	element: HTMLElement
	draggableItem: HTMLElement
}

export type DispatchCause = ({}: {cause: string, pressed: boolean}) => void
