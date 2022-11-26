
import {LitElement} from "lit"
import {dispatchNubEvent} from "../../../framework/dispatch.js"

export function setupWindowMouseMoveListening(
		element: LitElement & {name: string}
	) {

	function handleMouseMove({movementX, movementY, clientX, clientY}: MouseEvent) {
		dispatchNubEvent()
			.atTarget(element)
			.input()
			.name(element.name)
			.mouse({
				movement: [movementX, movementY],
				position: [clientX, clientY],
			})
			.fire()
	}

	window.addEventListener("mousemove", handleMouseMove)

	return () => window.removeEventListener("mousemove", handleMouseMove)
}
