
export interface GridboardStarters {
	query(): {
		root: HTMLElement
		draggableItem: HTMLElement,
		keysButtons: any
	}
	triggerInput: ({key, pressed}: {key: string, pressed: boolean}) => void
}
