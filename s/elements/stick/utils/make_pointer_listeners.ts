
import {V2} from "../../../tools/v2.js"
import {asLitListener} from "../../../tools/lit-listener.js"
import {findTouchAppleFriendly} from "../../../tools/find-touch-ios-friendly.js"

export function make_pointer_listeners({
		get_pointer_capture_element, set_vector, set_pointer_position,
	}: {
		get_pointer_capture_element: () => HTMLElement
		set_vector: (vector: V2) => void
		set_pointer_position: (position: V2) => void
	}) {

	let pointer_id: number | undefined

	return {

		pointerdown: asLitListener<PointerEvent>({
			handleEvent: event => {
				event.preventDefault()
				get_pointer_capture_element().setPointerCapture(event.pointerId)
				pointer_id = event.pointerId
				set_pointer_position([event.clientX, event.clientY])
			},
		}),

		pointermove: asLitListener<PointerEvent>({
			passive: false,
			handleEvent: event => {
				event.preventDefault()

				const pointer = findTouchAppleFriendly(
					pointer_id,
					event.getCoalescedEvents(),
				)

				if (pointer) {
					const {clientX, clientY} = pointer
					set_pointer_position([clientX, clientY])
				}
			},
		}),

		pointerup: asLitListener<PointerEvent>({
			handleEvent: event => {
				event.preventDefault()
				pointer_id = undefined
				set_vector([0, 0])
			},
		}),
	}
}
