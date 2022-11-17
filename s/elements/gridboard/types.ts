
import {Nub} from "../../types.js"

export interface GridboardStarters {
	query(): {
		element: HTMLElement
		draggableItem: HTMLElement,
	}
	triggerInput: ({}: Nub.Data.Key) => void
}
