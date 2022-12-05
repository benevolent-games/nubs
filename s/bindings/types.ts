
export interface Binds {
	[action: string]: string[]
}

export interface Bindings {
	comment: string[]
	mouse: Binds
	vector2: Binds
	key: Binds
}
