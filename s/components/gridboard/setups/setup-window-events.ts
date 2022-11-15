import {NubInput} from "../../../events/nub-input.js"
import {attachEvents} from "../../../tools/attach-events.js"
import {Nub} from "../../../types.js"
import {GridboardStarters} from "../types.js"
import {keys} from "./utils/keys.js"

export function setupWindowEvents({query, triggerInput}: GridboardStarters) {
	return () => attachEvents(window, {
		keydown(e) {
			const keysButtons = query().keysButtons
			const {key} = <KeyboardEvent>e
			const keyData = keys[key]
			const index = Object.keys(keys).indexOf(keyData.key)
			if (keyData) {
				triggerInput({key: key, pressed: true})
				keysButtons[index]?.setAttribute("pressed", "")
			}
		},
		keyup(e) {
			const keysButtons = query().keysButtons
			const {key} = <KeyboardEvent>e
			const keyData = keys[key]
			const index = Object.keys(keys).indexOf(keyData.key)
			if (keyData) {
				triggerInput({key: key, pressed: true})
				keysButtons[index]?.removeAttribute("pressed")
			}
		}
	})
}
