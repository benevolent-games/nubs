
import {Bindings} from "../../../types.js"

export function findActionsForVector2Event(channels: string[], bindings: Bindings) {
	const vbinds = Object.entries(bindings["🕹️"])
	const actions = new Set<string>()

	for (const [bindAction, bindChannels] of vbinds) {

		const someChannelsArePresentInThisBinding = channels
			.some(c => bindChannels.includes(c))

		if (someChannelsArePresentInThisBinding)
			actions.add(bindAction)
	}

	return [...actions]
}
