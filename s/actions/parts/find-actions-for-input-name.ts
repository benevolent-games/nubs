
import {ActionContext} from "../action-context.js"

export function findActionsForInputName({kind, name, context: {modes, bindings}}: {
		context: ActionContext
		kind: string
		name: string
	}) {

	const matchingActions = new Set<string>()

	for (const mode of modes) {
		const kindbinds = bindings[mode] ?? {}
		const binds = kindbinds[kind] ?? {}

		for (const [action, bindlist] of Object.entries(binds)) {
			if (bindlist.includes(name))
				matchingActions.add(action)
		}
	}

	return [...matchingActions]
}
