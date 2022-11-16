
import {LitElement} from "lit"
import {dispatchNubEvent} from "../../../framework/dispatch.js"

export function setupWindowMouseListening(
		element: LitElement & {channels: string}
	) {

	function handleMouseMove({clientX, clientY}: MouseEvent) {
		dispatchNubEvent(element)
			.parseChannels(element.channels)
			.input
			.vector2({vector: [clientX, clientY]})
	}

	window.addEventListener("mousemove", handleMouseMove)

	return () => window.removeEventListener("mousemove", handleMouseMove)
}
