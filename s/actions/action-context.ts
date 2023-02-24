
import {Actions} from "./types/actions.js"
import {Bindings} from "./types/bindings.js"

export class ActionContext {
	actions: Actions
	modes: Set<string>
	bindings: Bindings

	constructor({modes, bindings}: {
			modes: string[]
			bindings: Bindings
		}) {

		this.actions = {}
		this.bindings = bindings
		this.modes = new Set(modes)
	}
}
