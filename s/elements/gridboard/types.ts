
import {Nub} from "../../types.js"

export interface GridboardStarters {
	query(): {
		root: HTMLElement
		draggableItem: HTMLElement,
		keysButtons: any
	}
	triggerInput: ({}: Nub.Data.Key) => void
}
