
import {html} from "lit"
import {css} from "@chasemoskal/magical/x/camel-css/camel-css-lit.js"
import {component2 as element} from "@chasemoskal/magical/x/component.js"

import {setupWindowKeyboardListening} from "./utils/setup-window-keyboard-listening.js"

export const NubRealKeyboard = element<{
		name: string
	}>({
		shadow: true,
		styles: css`:host {display: none}`,
		properties: {
			name: {type: String, reflect: true},
		},
	}).render(use => {

	use.setup(setupWindowKeyboardListening)

	return html``
})
