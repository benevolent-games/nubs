
import {Bindings} from "../../../types.js"

export function findActionsForKeyEvent(
		code: string,
		channels: string[],
		bindings: Bindings,
	) {

	const keybinds = Object.entries(bindings["*️⃣"])
	const actions = new Set<string>()

	for (const [bindAction, binds] of keybinds) {
		for (const [bindChannel, ...bindKeys] of binds) {

			const isMatchingChannel =
				bindChannel === ""
				|| channels.includes(bindChannel)

			const isMatchingKey = bindKeys.includes(code)

			if (isMatchingChannel && isMatchingKey)
				actions.add(bindAction)
		}
	}

	return [...actions]
}
