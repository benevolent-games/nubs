
import {LitElement} from "lit"

import {Nub} from "../../../types.js"
import {GridboardStarters} from "../types.js"
import {NubInputEvent} from "../../../main.js"

export function getStarters(
		element: LitElement & {name: string}
	): GridboardStarters {

	return {
		query: () => ({
			element,
			draggableItem: element.shadowRoot!.querySelector(".draggable-item")!,
		}),
		triggerInput(data: Nub.Data.Key) {
			NubInputEvent
				.target(element)
				.dispatch({
					...data,
					type: Nub.Type.Key,
					name: element.name,
				})
		},
	}
}
