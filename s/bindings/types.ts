
export interface Binds {
	[action: string]: string[]
}

export interface Bindings {

	/** comments */
	comment: string[]

	/** mouse action bindings */
	mouse: Binds

	/** vector2 action bindings */
	vector2: Binds

	/** key action bindings */
	key: Binds
}
