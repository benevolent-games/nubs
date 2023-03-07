
import {asLitListener} from "../../../tools/lit-listener.js"

export function setup_lookpad_pointer_listeners({
		on_pointer_drag, get_pointer_capture_element,
	}: {
		on_pointer_drag: ({}: PointerEvent) => void
		get_pointer_capture_element: () => HTMLElement
	}) {

	let pointer_id: number | undefined

	return {

		pointerdown: asLitListener<PointerEvent>({
			handleEvent: event => {
				event.preventDefault()

				const element = get_pointer_capture_element()

				if (pointer_id)
					element.releasePointerCapture(pointer_id)

				pointer_id = event.pointerId
				element.setPointerCapture(pointer_id)
				on_pointer_drag(event)
			},
		}),

		pointermove: asLitListener<PointerEvent>({
			passive: false,
			handleEvent: event => {
				event.preventDefault()

				if (event.pointerId === pointer_id)
					on_pointer_drag(event)
			},
		}),

		pointerup: asLitListener<PointerEvent>({
			handleEvent: event => {
				event.preventDefault()

				if (event.pointerId === pointer_id) {
					get_pointer_capture_element().releasePointerCapture(pointer_id)
					pointer_id = undefined
					on_pointer_drag(event)
				}
			},
		}),
	}
}
