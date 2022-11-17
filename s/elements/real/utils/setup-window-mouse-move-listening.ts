
import {LitElement} from "lit"
import {V2} from "../../../tools/v2.js"
import {dispatchNubEvent} from "../../../framework/dispatch.js"

export function setupWindowMouseMoveListening(
		element: LitElement & {channel: string}
	) {

	function handleMouseMove({movementX, movementY}: MouseEvent) {
		const vector: V2 = [movementX, movementY]
		dispatchNubEvent()
			.atTarget(element)
			.input()
			.parseChannels(element.channel)
			.vector2({vector})
			.fire()
	}

	window.addEventListener("mousemove", handleMouseMove)

	return () => window.removeEventListener("mousemove", handleMouseMove)
}
