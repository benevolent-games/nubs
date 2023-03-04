
export type Bindings = {
	[mode: string]: Kinds
}

export type Kinds = {
	[kind: string]: Binds
}

export type Binds = {
	[effect: string]: string[]
}
