
import {DispatchCause} from "../types.js"

export function prepGridboardEvents(triggerCause: DispatchCause) {
	return {

		pointerdown: (e: PointerEvent) => {
			const element = <HTMLElement>e.target
			const keycode = element.getAttribute("data-keycode")
			if (keycode) {
				triggerCause({cause: keycode, pressed: true})
				element.setAttribute("data-pressed", "")
			}
		},

		pointerup(e: PointerEvent) {
			const element = <HTMLElement>e.target
			const keycode = element.getAttribute("data-keycode")
			if (keycode) {
				triggerCause({cause: keycode, pressed: false})
				element.removeAttribute("data-pressed")
			}
		}
	}
}
