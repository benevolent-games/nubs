
import {LitElement} from "lit"
import {V2} from "../../../tools/v2.js"
import {dispatchNubEvent} from "../../../framework/dispatch.js"

export function setupWindowMouseListening(
		element: LitElement & {channels: string}
	) {

	function handleMouseMove({clientX, clientY}: MouseEvent) {
		const vector: V2 = [clientX, clientY]
		dispatchNubEvent()
			.atTarget(element)
			.input()
			.parseChannels(element.channels)
			.vector2({vector})
	}

	window.addEventListener("mousemove", handleMouseMove)

	return () => window.removeEventListener("mousemove", handleMouseMove)
}
