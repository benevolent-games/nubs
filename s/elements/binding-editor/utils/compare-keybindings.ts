import {Bindings} from "../../../types.js"
import {loadBindings} from "./loadBindings.js"

export const compareKeybindings = (stateKeybinds: Bindings) => {
	const savedBindings = JSON.stringify(loadBindings())
	const stateBindings = JSON.stringify(stateKeybinds)
	return savedBindings === stateBindings
}
