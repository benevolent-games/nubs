
import {html} from "lit"
import {component2 as element} from "@chasemoskal/magical/x/component.js"

import {setupWindowMouseMoveListening} from "./utils/setup-window-mouse-move-listening.js"
import {setupWindowMouseButtonListening} from "./utils/setup-window-mouse-button-listening.ts.js"

export const NubRealMouse = element<{
		channels: string
	}>({
		shadow: true,
		properties: {
			channels: {type: String, reflect: true},
		},
	}).render(use => {

	use.setup(setupWindowMouseMoveListening)
	use.setup(setupWindowMouseButtonListening)

	return html``
})
