
import {html} from "lit"
import {css} from "@chasemoskal/magical/x/camel-css/camel-css-lit.js"
import {component2 as element} from "@chasemoskal/magical/x/component.js"

import {setupWindowMouseMoveListening} from "./utils/setup-window-mouse-move-listening.js"
import {setupWindowMouseButtonListening} from "./utils/setup-window-mouse-button-listening.ts.js"

export const NubRealMouse = element<{
		name: string
	}>({
		shadow: true,
		styles: css`:host {display: none}`,
		properties: {
			name: {type: String, reflect: true},
		},
	}).render(use => {

	use.setup(setupWindowMouseMoveListening)
	use.setup(setupWindowMouseButtonListening)

	return html``
})
