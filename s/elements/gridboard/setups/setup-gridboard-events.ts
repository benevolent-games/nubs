
import {keys} from "./utils/keys.js"
import {GridboardStarters} from "../types.js"

export function setupGridboardEvents({triggerInput}: GridboardStarters) {
	return {
		pointerdown: (e: PointerEvent) => {
			const element = <HTMLElement>e.target
			const key = element.getAttribute("data-key")!
			const data = keys[key]
			triggerInput({key: key, pressed: true})
			element.setAttribute("pressed", "")
		
		},
		pointerup(e: PointerEvent) {
			const element = <HTMLElement>e.target
			const key = element.getAttribute("data-key")?.toUpperCase()!
			triggerInput({key: key, pressed: false})
			element.removeAttribute("pressed")
		}
	}
}
