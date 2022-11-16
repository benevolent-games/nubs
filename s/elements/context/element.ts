
import {html} from "lit"
import {component2 as element} from "@chasemoskal/magical/x/component.js"

import {styles} from "./style.css.js"
import {Bindings} from "../../types.js"

const defaultBindings: Bindings = {
	"👼": [
		"Default Bindings for Hackers"
	],
	"🕹️": {
		"look": ["look"],
		"move": ["move"]
	},
	"*️⃣": {
		"forward": [["", "KeyW", "ArrowUp"]],
		"back": [["", "KeyS", "ArrowDown"]],
		"left": [["", "KeyA", "ArrowLeft"]],
		"right": [["", "KeyD", "ArrowRight"]],
		"use": [["", "KeyF", "Mouse3"]]
	}
}

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
