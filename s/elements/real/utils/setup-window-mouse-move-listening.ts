
import {LitElement} from "lit"
import {Nub} from "../../../types.js"
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
				type: Nub.Type.Mouse,
			})
	}

	window.addEventListener("mousemove", handleMouseMove)

	return () => window.removeEventListener("mousemove", handleMouseMove)
}
