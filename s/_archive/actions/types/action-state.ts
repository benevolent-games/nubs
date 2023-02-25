
import {Actions} from "./actions.js"
import {Bindings} from "./bindings.js"

export type ActionState = {
	actions: Actions
	modes: Set<string>
	bindings: Bindings
}
