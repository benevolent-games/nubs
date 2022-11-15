import {GridboardStarters} from "../types.js"
import {keys} from "./utils/keys.js"

export function setupGridboardEvents({triggerInput}: GridboardStarters) {
	return {
		pointerdown: (e: PointerEvent) => {
			const key = e.target?.getAttribute("data-key")
			const data = keys[key]
			triggerInput({key: key, pressed: true})
			e.target?.setAttribute("pressed", "")
		
		},
		pointerup(e: PointerEvent) {
			const key = e.target?.getAttribute("data-key")?.toUpperCase()!
			triggerInput({key: key, pressed: false})
			e.target?.removeAttribute("pressed")
		}
	}
}
