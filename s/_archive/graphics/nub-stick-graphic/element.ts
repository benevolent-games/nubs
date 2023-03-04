
import {html} from "lit"
import {property} from "lit/decorators.js"
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import styles from "./style.css.js"
import {V2} from "../../tools/v2.js"

@mixinCss(styles)
export class NubStickGraphic extends MagicElement {

	get basePart() {
		return this.shadowRoot?.querySelector("[part='base']")
	}

	get stickPart() {
		return this.shadowRoot?.querySelector("[part='stick']")
	}

	@property({type: Number, reflect: true})
	vector: V2 = [0, 0]

	realize() {

	const underX = this.vector[0] * 0.5
	const underY = this.vector[1] * 0.5

		return html`
			<div
				class=base
				part="base">
				<div
					class=stick
					part="stick"
					style="${`transform: translate(${this.vector[0]}px, ${this.vector[1]}px);`}">
				</div>
				<div
					style=${`transform: translate(${underX}px, ${underY}px);`}
					class=understick>
				</div>
			</div>
		`
	}
}
