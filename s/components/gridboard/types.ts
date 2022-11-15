import {Nub} from "../../types.js"

export interface GridboardStarters {
	query(): {
		root: HTMLElement
		draggableItem: HTMLElement,
		keysButtons: any
	}

	triggerInput: ({key, pressed}: Nub.Detail.Key) => void
}
