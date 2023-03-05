
import {html, LitElement} from "lit"
import {property, query} from "lit/decorators.js"
import {mixinCss, nap} from "@chasemoskal/magical"

import {V2} from "../../tools/v2.js"
import {styles} from "./styles.css.js"
import {NubStickGraphic} from "../stick-graphic/element.js"
import {calculate_offset} from "./utils/calculate_offset.js"
import {transform} from "../stick-graphic/utils/transform.js"
import {calculate_centered_offset} from "./utils/calculate_centered_offset.js"
import {make_pointer_listeners} from "../stick/utils/make_pointer_listeners.js"
import {calculate_new_vector_from_pointer_position} from "../stick/utils/calculate_new_vector_from_pointer_position.js"
import {NubCauseEvent} from "../../events/cause.js"

@mixinCss(styles)
export class NubStickpad extends LitElement {

	@property({type: String, reflect: true})
	cause: string = "Stick"

	@property()
	private vector: V2 = [0, 0]

	@property()
	private offset: V2 = [0, 0]

	@query(`[part="area"]`)
	private area: HTMLElement | undefined

	@query(NubStickGraphic.tag)
	private graphic: NubStickGraphic | undefined

	get #area_rect(): DOMRect | undefined {
		return this.area?.getBoundingClientRect()
	}

	#reset_offset_to_center = () => {
		this.offset = calculate_centered_offset(
			this.graphic!.basis!,
			this.#area_rect!,
		)
	}

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

	#pointer_listeners_augmented_to_change_offset = {
		pointerdown: (event: PointerEvent) => {
			this.offset = calculate_offset(
				event,
				this.graphic!.basis!,
				this.#area_rect!,
			)
			this.#pointer_listeners.pointerdown.handleEvent(event)
		},
		pointerup: (event: PointerEvent) => {
			this.#reset_offset_to_center()
			this.#pointer_listeners.pointerup.handleEvent(event)
		},
	}

	firstUpdated() {
		nap(0).then(() => this.#reset_offset_to_center())
	}

	render() {
		const listeners = this.#pointer_listeners
		const augmented = this.#pointer_listeners_augmented_to_change_offset
		const graphic_style = transform(...this.offset)

		return html`
			<div
				part=area
				@pointerdown=${augmented.pointerdown}
				@pointermove=${listeners.pointermove}
				@pointerup=${augmented.pointerup}
				>
				<nub-stick-graphic
					part=graphic
					exportparts="base over under"
					style="${graphic_style}"
					.vector=${this.vector}
				></nub-stick-graphic>
			</div>
		`
	}
}
