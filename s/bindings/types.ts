
export interface Binds {
	[action: string]: string[]
}

export interface Bindings {
	comment: string[]
	mouse: Binds
	vector2: Binds
	key: Binds
}

export interface BindingsStore {
	save(bindings: Bindings | undefined): void
	load(): Bindings | undefined
}
