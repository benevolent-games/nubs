
export type Bindings1 = {
	[mode: string]: {
		[kind: string]: {
			[effect: string]: string[]
		}
	}
}

export type Bindings2 = {
	version: number,
	modes: {
		[mode: string]: {
			[kind: string]: {
				[effect: string]: string[][]
			}
		}
	}
}

export type Bindings = Bindings2
