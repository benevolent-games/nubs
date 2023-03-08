
import {V2} from "../../../tools/v2.js"
import {asLitListener} from "../../../tools/lit-listener.js"

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

				const element = get_pointer_capture_element()

				if (pointer_id)
					element.releasePointerCapture(pointer_id)

				pointer_id = event.pointerId
				element.setPointerCapture(pointer_id)
				set_pointer_position([event.clientX, event.clientY])
				set_vector([0, 0])
			},
		}),

		pointermove: asLitListener<PointerEvent>({
			passive: false,
			handleEvent: event => {
				event.preventDefault()

				if (event.pointerId === pointer_id)
					set_pointer_position([event.clientX, event.clientY])
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
