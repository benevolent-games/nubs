import {MagicElement, mixinCss, UseElement} from "@chasemoskal/magical"
import {html, TemplateResult} from "lit"
import {property} from "lit/decorators.js"
import styles from "./style.css.js"

@mixinCss(styles)
export class NubStickGraphic extends MagicElement {

	@property({type: Number, reflect: true})
	vector: {
		x: 0
		y: 0
	} | undefined

	realize(use: UseElement<this>): void | TemplateResult<1 | 2> {

	const underX = this.vector!.x * 0.5
	const underY = this.vector!.y * 0.5

		return html`
			<div
				class=base
				part="base">
				<div
					class=stick
					part="stick"
					style="${`transform: translate(${this.vector?.x}px, ${this.vector?.y}px);`}">
				</div>
				<div
					style=${`transform: translate(${underX}px, ${underY}px);`}
					class=understick>
				</div>
			</div>
		`
	}
}
