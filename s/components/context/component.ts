import {component} from "@chasemoskal/magical/x/component.js"
import {html} from "lit"
import {NubGridboard} from "../gridboard/component.js"
import {styles} from "./style.css.js"

export const NubContext = component({
		styles,
		shadow: true,
		properties: {},
	}, use => {

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
