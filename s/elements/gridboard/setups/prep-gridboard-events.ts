
import {keys} from "./utils/keys.js"
import {GridboardStarters} from "../types.js"

export function prepGridboardEvents({triggerInput}: GridboardStarters) {
	return {
		pointerdown: (e: PointerEvent) => {
			const element = <HTMLElement>e.target
			const code = element.getAttribute("data-key")!
			// const data = keys[key]
			triggerInput({code, pressed: true})
			element.setAttribute("pressed", "")
		},
		pointerup(e: PointerEvent) {
			const element = <HTMLElement>e.target
			const key = element.getAttribute("data-key")?.toUpperCase()!
			triggerInput({code: key, pressed: false})
			element.removeAttribute("pressed")
		}
	}
}
