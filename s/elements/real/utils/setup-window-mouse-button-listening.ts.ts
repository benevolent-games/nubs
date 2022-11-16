
import {LitElement} from "lit"
import {dispatchNubEvent} from "../../../framework/dispatch.js"
import {convertMouseButtonToKeyCode} from "./convert-mouse-button-to-key-code.js"

export function setupWindowMouseButtonListening(
		element: LitElement & {channels: string}
	) {

	const handlers = {
		mousedown({button}: MouseEvent) {
			const pressed = true
			const code = convertMouseButtonToKeyCode(button)
			dispatchNubEvent()
				.atTarget(element)
				.input()
				.parseChannels(element.channels)
				.key({code, pressed})
				.fire()
		},
		mouseup({button}: MouseEvent) {
			const pressed = false
			const code = convertMouseButtonToKeyCode(button)
			dispatchNubEvent()
				.atTarget(element)
				.input()
				.parseChannels(element.channels)
				.key({code, pressed})
				.fire()
		},
	}

	for (const [name, handler] of Object.entries(handlers))
		window.addEventListener(name, <any>handler)

	return () => {
		for (const [name, handler] of Object.entries(handlers))
			window.removeEventListener(name, <any>handler)
	}
}
