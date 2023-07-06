
export type Bindings = {
	[mode: string]: {
		[kind: string]: {
			[effect: string]: (string | string[])[]
		}
	}
}
