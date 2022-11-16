
import {html} from "lit"
import {component2 as element} from "@chasemoskal/magical/x/component.js"

import {styles} from "./style.css.js"

export const NubContext = element({
		styles,
		shadow: true,
		properties: {},
	}).render(use => {

	const flipMode = () => {
		use.element.toggleAttribute("edit-mode")
	}

	return html`
		<div>
			<button @pointerdown=${flipMode} class="flip">flip mode</button>
			<slot>
			</slot>
		</div>
	`
})
