
import {TriggerInput} from "../types.js"

export function prepGridboardEvents(triggerInput: TriggerInput) {
	return {

		pointerdown: (e: PointerEvent) => {
			const element = <HTMLElement>e.target
			const keycode = element.getAttribute("data-keycode")
			if (keycode) {
				triggerInput({code: keycode, pressed: true})
				element.setAttribute("data-pressed", "")
			}
		},

		pointerup(e: PointerEvent) {
			const element = <HTMLElement>e.target
			const keycode = element.getAttribute("data-keycode")
			if (keycode) {
				triggerInput({code: keycode, pressed: false})
				element.removeAttribute("data-pressed")
			}
		}
	}
}
