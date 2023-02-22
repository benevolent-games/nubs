
import {html} from "lit"
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import {Nub} from "../../types.js"
import styles from "./style.css.js"
import * as v2 from "../../tools/v2.js"
import {StickStarters} from "./types.js"
import {property} from "lit/decorators.js"
import {NubInputEvent} from "../../events/input.js"
import {prepBaseEvents} from "./setups/prep-base-events.js"
import {prepDomControls} from "./setups/prep-dom-controls.js"
import {setupBaseEvents} from "./setups/setup-base-events.js"
import {setupWindowEvents} from "./setups/setup-window-events.js"

@mixinCss(styles)
export class NubStick extends MagicElement {

	@property({type: String, reflect: true})
	name: string = "1"

	realize() {
		const {use} = this

		const [, setTrackingPointerId, getTrackingPointerId] =
			use.state<number | undefined>(undefined)

		const [vector, setVector] = use.state({
			x: 0,
			y: 0
		})

		const starters: StickStarters = {
			setVector,
			setTrackingPointerId,
			getTrackingPointerId,
			query: () => ({
				base: this.shadowRoot?.querySelector("nub-stick-graphic")!
					.shadowRoot?.querySelector("[part='base']")!,
				stick: this.shadowRoot?.querySelector("nub-stick-graphic")!
					.shadowRoot?.querySelector("[part='stick']")!
			}),
			triggerInput: (vector: v2.V2) => {
				NubInputEvent
					.target(this)
					.dispatch({
						vector,
						type: Nub.Type.Vector2,
						name: this.name,
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
