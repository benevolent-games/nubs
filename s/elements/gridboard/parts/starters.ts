
import {LitElement} from "lit"

import {Nub} from "../../../types.js"
import {GridboardStarters} from "../types.js"
import {dispatchNubEvent} from "../../../framework/dispatch.js"

export function getStarters(
		element: LitElement & {name: string}
	): GridboardStarters {

	return {
		query: () => ({
			element,
			draggableItem: element.shadowRoot!.querySelector(".draggable-item")!,
		}),
		triggerInput(data: Nub.Data.Key) {
			dispatchNubEvent()
				.atTarget(element)
				.input()
				.name(element.name)
				.key(data)
				.fire()
		},
	}
}
