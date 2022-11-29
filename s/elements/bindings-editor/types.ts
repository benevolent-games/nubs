
export interface Waiting {
	action: string
	keyIndex: number
}

export interface AssignKeybind {
	(action: string, keyIndex: number, keyCode: string): void
}
