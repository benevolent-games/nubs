
import {html} from "lit"
import {property} from "lit/decorators.js"
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import styles from "./style.css.js"
import {V2} from "../../tools/v2.js"
import {StickStarters} from "./types.js"
import {NubCauseEvent} from "../../events/cause.js"
import {prepBaseEvents} from "../../setups/prep-base-events.js"
import {prepDomControls} from "../../setups/prep-dom-controls.js"
import {setupBaseEvents} from "../../setups/setup-base-events.js"
import {setupWindowEvents} from "../../setups/setup-window-events.js"
import {NubStickGraphic} from "../../graphics/nub-stick-graphic/element.js"

@mixinCss(styles)
export class NubStick extends MagicElement {

	@property({type: String, reflect: true})
	cause: string = "Stick"

	get nubStickGraphicParts() {
		const {basePart, stickPart} = this.shadowRoot?.querySelector("nub-stick-graphic") as NubStickGraphic
		return {basePart, stickPart} as {basePart: HTMLElement, stickPart: HTMLElement}
	}

	realize() {
		const {use} = this

		const [, setTrackingPointerId, getTrackingPointerId] =
			use.state<number | undefined>(undefined)

		const [vector, setVector] = use.state<V2>([0, 0])

		const starters: StickStarters = {
			setVector,
			setTrackingPointerId,
			getTrackingPointerId,
			query: () => ({
				base: this.nubStickGraphicParts.basePart,
				stick: this.nubStickGraphicParts.stickPart
			}),
			triggerInput: (vector: V2) => {
				NubCauseEvent
					.target(this)
					.dispatch({
						vector,
						kind: "stick",
						cause: this.cause,
					})
			},
		}

		const controls = prepDomControls(starters)
		const baseEvents = prepBaseEvents({...starters, ...controls})

		use.setup(setupWindowEvents({...starters, ...controls}))
		use.setup(setupBaseEvents(this, baseEvents))

		return html`
			<nub-stick-graphic .vector=${vector}></nub-stick-graphic>
		`
	}
}
