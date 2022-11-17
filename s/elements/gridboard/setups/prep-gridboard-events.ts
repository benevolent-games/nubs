
import {GridboardStarters} from "../types.js"

export function prepGridboardEvents({triggerInput}: GridboardStarters) {
	return {
		pointerdown: (e: PointerEvent) => {
			const element = <HTMLElement>e.target
			const keycode = element.getAttribute("data-keycode")!
			triggerInput({code: keycode, pressed: true})
			element.setAttribute("data-pressed", "")
		},
		pointerup(e: PointerEvent) {
			const element = <HTMLElement>e.target
			const keycode = element.getAttribute("data-keycode")!
			triggerInput({code: keycode, pressed: false})
			element.removeAttribute("data-pressed")
		}
	}
}
