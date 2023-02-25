
import {LitElement} from "lit"
import {NubInputEvent} from "../../../events/input.js"

export function setupWindowMouseMoveListening(
		element: LitElement & {name: string}
	) {

	function handleMouseMove({movementX, movementY, clientX, clientY}: MouseEvent) {
		NubInputEvent
			.target(element)
			.dispatch({
				movement: [movementX, movementY],
				position: [clientX, clientY],
				name: element.name,
				kind: "mouse",
			})
	}

	window.addEventListener("mousemove", handleMouseMove)

	return () => window.removeEventListener("mousemove", handleMouseMove)
}
