
import {html} from "lit"
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import {styles} from "./style.css.js"

import {property} from "lit/decorators.js"
import {setupMouseAndTouchMoveListening} from "./utils/setup-mouse-and-touch-move-listening.js"

@mixinCss(styles)
export class NubLookpad extends MagicElement {

	@property({type: String, reflect: true})
	name: string = "p"

	realize() {
		const {use} = this

		use.setup(setupMouseAndTouchMoveListening)

		return html`
			<div></div>
		`
	}
}
