
import {Nub} from "../../../types.js"
import {NubInputEvent} from "../../../events/input.js"

export function makeTriggerInputFunction(
		element: HTMLElement & {name: string}
	) {
	return function triggerInput(data: Nub.Data.Key) {
		NubInputEvent
			.target(element)
			.dispatch({
				...data,
				kind: "key",
				name: element.name,
			})
	}
}
