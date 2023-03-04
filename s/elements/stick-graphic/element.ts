
import {html, LitElement} from "lit"
import {mixinCss} from "@chasemoskal/magical"
import {property, query} from "lit/decorators.js"

import {V2} from "../../tools/v2.js"
import {styles} from "./style.css.js"
import {Basis} from "./types/basis.js"
import {transform} from "./utils/transform.js"
import {calculate_basis} from "./utils/calculate_basis.js"
import {stick_vector_to_pixels} from "./utils/stick_vector_to_pixels.js"

@mixinCss(styles)
export class NubStickGraphic extends LitElement {

	@property()
	vector: V2 = [0, 0]

	@query(`[part="base"]`)
	private base?: HTMLElement

	@query(`[part="stick"]`)
	private stick?: HTMLElement

	get basis(): Basis | undefined {
		return calculate_basis(this.base, this.stick)
	}

	render() {
		const {basis, vector} = this
		const [x, y] = stick_vector_to_pixels(basis?.radius, vector)

		const stickStyle = transform(x, y)
		const underStyle = transform(x * 0.5, y * 0.5)

		console.log(stickStyle)

		return html`
			<div part=base>
				<div part=stick style="${stickStyle}"></div>
				<div part=understick style="${underStyle}"></div>
			</div>
		`
	}
}
