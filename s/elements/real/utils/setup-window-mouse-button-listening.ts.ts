
import {LitElement} from "lit"
import {NubInputEvent} from "../../../events/input.js"
import {convertMouseButtonToKeyCode} from "./convert-mouse-button-to-key-code.js"

export function setupWindowMouseButtonListening(
		element: LitElement & {name: string}
	) {

	const handlers = {
		mousedown({button}: MouseEvent) {
			const pressed = true
			const code = convertMouseButtonToKeyCode(button)
			NubInputEvent
				.target(element)
				.dispatch({
					code,
					pressed,
					kind: "key",
					name: element.name,
				})
		},
		mouseup({button}: MouseEvent) {
			const pressed = false
			const code = convertMouseButtonToKeyCode(button)
			NubInputEvent
				.target(element)
				.dispatch({
					code,
					pressed,
					kind: "key",
					name: element.name,
				})
		},
	}

	for (const [name, handler] of Object.entries(handlers))
		window.addEventListener(name, <any>handler)

	return () => {
		for (const [name, handler] of Object.entries(handlers))
			window.removeEventListener(name, <any>handler)
	}
}
