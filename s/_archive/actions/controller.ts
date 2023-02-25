
import {Bindings} from "./types/bindings.js"
import {ActionState} from "./types/action-state.js"
import {ActionController} from "./types/action-controller.js"
import {RegulatedSet} from "../tools/regulated-set/regulated-set.js"
import {ReadableSet} from "../tools/regulated-set/types/readable-set.js"

export function setupActionController({
		state,
		onModesChange,
		onBindingsChange,
	}: {
		state: ActionState
		onModesChange: (modes: ReadableSet<string>) => void
		onBindingsChange: (bindings: Bindings) => void
	}): ActionController {

	const modes = new RegulatedSet(state.modes, onModesChange)

	return {
		get modes() { return modes.writable },
		get bindings() { return state.bindings },
		set bindings(b: Bindings) {
			state.bindings = b
			onBindingsChange(b)
		},
	}
}
