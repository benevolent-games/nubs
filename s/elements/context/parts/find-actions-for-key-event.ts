
import {Bindings} from "../../../types.js"

export function findActionsForKeyEvent(
		code: string,
		bindings: Bindings,
	) {

	const keybinds = Object.entries(bindings["*️⃣"])
	const actions = new Set<string>()

	for (const [bindAction, bindKeys] of keybinds) {
		const isMatchingKey = bindKeys.includes(code)
		if (isMatchingKey)
			actions.add(bindAction)
	}

	return [...actions]
}
