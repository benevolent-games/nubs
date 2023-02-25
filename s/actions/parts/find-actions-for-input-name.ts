
import {ActionState} from "../types/action-state.js"

export function findActionsForInputName({kind, name, state}: {
		state: ActionState
		kind: string
		name: string
	}) {

	const matchingActions = new Set<string>()

	for (const mode of state.modes) {
		const kindbinds = state.bindings[mode] ?? {}
		const binds = kindbinds[kind] ?? {}

		for (const [action, bindlist] of Object.entries(binds)) {
			if (bindlist.includes(name))
				matchingActions.add(action)
		}
	}

	return [...matchingActions]
}
