
import {html} from "lit"
import {component2 as component} from "@chasemoskal/magical/x/component.js"

import {setupWindowMouseListening} from "./utils/setup-window-mouse-listening.js"

export const NubRealMouse = component<{
		channels: string
	}>({
		shadow: true,
		properties: {
			channels: {type: String, reflect: true},
		},
	}).render(use => {

	use.setup(setupWindowMouseListening)

	return html``
})
