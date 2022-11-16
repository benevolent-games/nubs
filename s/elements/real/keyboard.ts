
import {html} from "lit"
import {component2 as component} from "@chasemoskal/magical/x/component.js"

import {setupWindowKeyboardListening} from "./utils/setup-window-keyboard-listening.js"

export const NubRealKeyboard = component<{
		channels: string
	}>({
		shadow: true,
		properties: {
			channels: {type: String, reflect: true},
		},
	}).render(use => {

	use.setup(setupWindowKeyboardListening)

	return html``
})
