
import {html, LitElement} from "lit"
import {mixinCss} from "@chasemoskal/magical"
import {property, query} from "lit/decorators.js"

import {V2} from "../../tools/v2.js"
import {styles} from "./styles.css.js"
import {Basis} from "./types/basis.js"
import {transform} from "./utils/transform.js"
import {calculate_basis} from "./utils/calculate_basis.js"
import {stick_vector_to_pixels} from "./utils/stick_vector_to_pixels.js"

@mixinCss(styles)
export class NubStickGraphic extends LitElement {
	static tag = "nub-stick-graphic"

	@property()
	vector: V2 = [0, 0]

	@query(`[part="base"]`)
	private base?: HTMLElement

	@query(`[part="over"]`)
	private over?: HTMLElement

	get basis(): Basis | undefined {
		return calculate_basis(this.base, this.over)
	}

	render() {
		const {basis, vector} = this
		const [x, y] = stick_vector_to_pixels(basis?.radius, vector)

		const over_style = transform(x, y)
		const under_style = transform(x * 0.5, y * 0.5)

		return html`
			<div part=base>
				<div part=under style="${under_style}"></div>
				<div part=over style="${over_style}"></div>
			</div>
		`
	}
}
