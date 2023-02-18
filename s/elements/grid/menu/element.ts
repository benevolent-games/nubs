
import {html} from "lit"
import {property} from "lit/decorators.js"
import {MagicElement} from "@chasemoskal/magical"

import {Mode} from "./parts/mode.js"
import {NubActionEvent} from "../../../events/action.js"

export class NubGridMenu extends MagicElement {

	@property({type: String, reflect: true})
	mode: Mode = "home"

	realize() {
		const {use} = this

		use.setup(() => NubActionEvent
			.target(window)
			.listen(event => {
				console.log("action!", event.detail.action)
			}))

		return html`
			grid menu ${this.mode}
		`
	}
}
