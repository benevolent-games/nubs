
import {LitElement} from "lit"
import {Nub} from "../../../types.js"
import {NubInputEvent} from "../../../events/input.js"
import {attachEvents} from "../../../tools/attach-events.js"

export function setupMouseAndTouchMoveListening(
		element: LitElement & {name: string}
	) {

	let isPointerDown = false

	return attachEvents(element, {
		pointerdown() {
			isPointerDown = true
		},
		pointermove(e) {
			if(isPointerDown) {
				const {movementX, movementY, clientX, clientY} = e as PointerEvent
				NubInputEvent
					.target(element)
					.dispatch({
						name: element.name,
						type: Nub.Type.Mouse,
						position: [clientX, clientY],
						movement: [movementX, movementY],
					})
			}
		},
		pointerup() {
			isPointerDown = false
		}
	})
}
