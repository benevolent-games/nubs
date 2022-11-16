
import {html} from "lit"
import {component2 as component} from "@chasemoskal/magical/x/component.js"

import {dispatchNubEvent} from "../../framework/dispatch.js"

export const NubRealPointer = component<{
		channels: string
	}>({
		shadow: true,
		properties: {
			channels: {type: String, reflect: true},
		},
	}).render(use => {

	use.setup(() => {
		function handleMouseMove({clientX, clientY}: MouseEvent) {
			dispatchNubEvent(use.element)
				.parseChannels(use.element.channels)
				.input
				.vector2({vector: [clientX, clientY]})
		}
		window.addEventListener("mousemove", handleMouseMove)
		return () => window.removeEventListener("mousemove", handleMouseMove)
	})

	return html``
})
