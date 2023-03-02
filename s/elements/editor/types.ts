
export interface Waiting {
	effect: string
	keyIndex: number
}

export interface AssignKeybind {
	(effect: string, keyIndex: number, keyCode: string): void
}
