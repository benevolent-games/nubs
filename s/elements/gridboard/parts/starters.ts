
import {LitElement} from "lit"

import {Nub} from "../../../types.js"
import {GridboardStarters} from "../types.js"
import {dispatchNubEvent} from "../../../framework/dispatch.js"

export function getStarters(
		element: LitElement & {channels: string}
	): GridboardStarters {

	return {
		query: () => ({
			element,
			draggableItem: element.shadowRoot!.querySelector(".draggable-item")!,
			keysButtons: element.shadowRoot!.querySelectorAll(".key")!
		}),
		triggerInput(data: Nub.Data.Key) {
			dispatchNubEvent()
				.atTarget(element)
				.input()
				.parseChannels(element.channels)
				.key(data)
				.fire()
		},
	}
}
