
import {Bindings} from "../../../types.js"

export function findActionsForMouseEvent(
		name: string,
		bindings: Bindings,
	) {

	const binds = Object.entries(bindings["🖱️"])
	const actions = new Set<string>()

	for (const [bindAction, bindNames] of binds) {
		const isMatch = bindNames.includes(name)
		if (isMatch)
			actions.add(bindAction)
	}

	return [...actions]
}
