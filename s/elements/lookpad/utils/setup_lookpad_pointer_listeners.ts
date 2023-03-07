
import {asLitListener} from "../../../tools/lit-listener.js"
import {findTouchAppleFriendly} from "../../../tools/find-touch-ios-friendly.js"

export function setup_lookpad_pointer_listeners({
		on_pointer_drag,
		get_pointer_capture_element,
	}: {
		on_pointer_drag: ({}: PointerEvent) => void
		get_pointer_capture_element: () => HTMLElement
	}) {

	let pointer_id: number | undefined

	return {

		pointerdown: asLitListener<PointerEvent>({
			handleEvent: event => {
				event.preventDefault()

				pointer_id = event.pointerId
				get_pointer_capture_element().setPointerCapture(pointer_id)

				on_pointer_drag(event)
			},
		}),

		pointermove: asLitListener<PointerEvent>({
			passive: false,
			handleEvent: event => {
				event.preventDefault()

				const event2 = findTouchAppleFriendly(
					pointer_id,
					event.getCoalescedEvents(),
				)

				if (event2)
					on_pointer_drag(event2)
			},
		}),

		pointerup: asLitListener<PointerEvent>({
			handleEvent: event => {
				event.preventDefault()

				pointer_id = undefined

				on_pointer_drag(event)
			},
		}),
	}
}
