
import {html, LitElement} from "lit"
import {mixinCss} from "@chasemoskal/magical"
import {property, query} from "lit/decorators.js"

import {V2} from "../../tools/v2.js"
import {styles} from "./styles.css.js"
import {NubCauseEvent} from "../../events/cause.js"
import {NubStickGraphic} from "../stick-graphic/element.js"
import {make_pointer_listeners} from "./utils/make_pointer_listeners.js"
import {calculate_new_vector_from_pointer_position} from "./utils/calculate_new_vector_from_pointer_position.js"

@mixinCss(styles)
export class NubStick extends LitElement {

	@property({type: String, reflect: true})
	cause: string = "Stick"

	@query(NubStickGraphic.tag)
	private graphic: NubStickGraphic | undefined

	@property()
	private vector: V2 = [0, 0]

	#update_vector_and_dispatch_cause = (vector: V2) => {
		this.vector = vector
		NubCauseEvent
			.target(this)
			.dispatch({
				vector,
				kind: "stick",
				cause: this.cause,
			})
	}

	#pointer_listeners = make_pointer_listeners({
		get_pointer_capture_element: () => this.graphic!,
		set_vector: this.#update_vector_and_dispatch_cause,
		set_pointer_position: position => {
			this.#update_vector_and_dispatch_cause(
				calculate_new_vector_from_pointer_position(
					this.graphic!.basis!,
					position,
				)
			)
		},
	})

	render() {
		const listeners = this.#pointer_listeners
		return html`
			<nub-stick-graphic
				part=graphic
				exportparts="base over under"
				.vector=${this.vector}
				@pointerdown=${listeners.pointerdown}
				@pointermove=${listeners.pointermove}
				@pointerup=${listeners.pointerup}
			></nub-stick-graphic>
		`
	}
}
