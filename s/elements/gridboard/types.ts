
import {Nub} from "../../types.js"

export interface GridboardStarters {
	query(): {
		element: HTMLElement
		draggableItem: HTMLElement,
		keysButtons: any
	}
	triggerInput: ({}: Nub.Data.Key) => void
}
