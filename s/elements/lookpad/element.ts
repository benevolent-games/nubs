
import {html} from "lit"
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import {styles} from "./style.css.js"
import {attachEvents} from "../../tools/attach-events.js"

@mixinCss(styles)
export class NubLookpad extends MagicElement {

	realize() {
		const {use} = this

		use.setup(() => {
			attachEvents(this, {
				pointerdown() {
					console.log(this)
				}
			})
		})

		return html`
			<div class="lookpad-area">
			</div>
		`
	}
}
