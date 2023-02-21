
import {LitElement} from "lit"
import {Nub} from "../../../types.js"
import {NubInputEvent} from "../../../events/input.js"
import {attachEvents} from "../../../tools/attach-events.js"

export function setupMouseAndTouchMoveListening(
		element: LitElement & {name: string}
	) {

	let prev: Touch | undefined = undefined
	return attachEvents(element, {
		touchmove(e) {
			const {touches} = e as TouchEvent
			const {clientX, clientY, pageX, pageY} = touches[0]

			const {movementX, movementY} = (() => {
				if (!prev)
					return {
						movementX: pageX,
						movementY: pageY,
					}
				else
					return {
						movementX: pageX - prev.pageX,
						movementY: pageY - prev.pageY
					}
			})()

			const target = e.target!
			NubInputEvent
				.target(target)
				.dispatch({
					name: element.name,
					type: Nub.Type.Mouse,
					position: [clientX, clientY],
					movement: [movementX, movementY],
				})
			
			prev = touches[0]
		},
		mousemove(e) {
			const {movementX, movementY, clientX, clientY} = e as MouseEvent
			const target = e.target!
			NubInputEvent
				.target(target)
				.dispatch({
					name: element.name,
					type: Nub.Type.Mouse,
					position: [clientX, clientY],
					movement: [movementX, movementY],
				})
		}
	})
}
