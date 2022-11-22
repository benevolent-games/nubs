
import {Bindings} from "../../../types.js"

export function findActionsForMouseEvent(channels: string[], bindings: Bindings) {
	const binds = Object.entries(bindings["🖱️"])
	const actions = new Set<string>()

	for (const [bindAction, bindChannels] of binds) {

		const someChannelsArePresentInThisBinding = channels
			.some(c => bindChannels.includes(c))

		if (someChannelsArePresentInThisBinding)
			actions.add(bindAction)
	}

	return [...actions]
}
