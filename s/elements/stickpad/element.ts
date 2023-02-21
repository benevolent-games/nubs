import {html, TemplateResult} from "lit"
import {MagicElement, mixinCss, UseElement} from "@chasemoskal/magical"
import * as v2 from "../../tools/v2.js"
import {Nub} from "../../types.js"

import styles from "./style.css.js"
import {StickpadStarters} from "./types.js"
import {setupStickpadEvents} from "./setups/setup-stickpad-events.js"
import {StickStarters} from "../stick/types.js"
import {NubInputEvent} from "../../events/input.js"
import {prepDomControls} from "../stick/setups/prep-dom-controls.js"
import {prepBaseEvents} from "../stick/setups/prep-base-events.js"
import {setupWindowEvents} from "../stick/setups/setup-window-events.js"
import {setupBaseEvents} from "../stick/setups/setup-base-events.js"
import {property} from "lit/decorators.js"

@mixinCss(styles)
export class NubStickpad extends MagicElement {

	@property({type: String, reflect: true})
	name: string = "1"

	get nubStickBasePart() {
		return this.shadowRoot?.querySelector("nub-stick-graphic")!
			.shadowRoot?.querySelector("[part='base']")!
	}

	realize(use: UseElement<this>): void | TemplateResult<1 | 2> {
		
		const [stick, setStick] = use.state(false)
		const [position, setPosition] = use.state("")
		
		const [, setTrackingMouse, getTrackingMouse] =
			use.state(false)

		const [, setTrackingTouchId, getTrackingTouchId] =
			use.state<number | undefined>(undefined)

		const [vector, setVector] = use.state({
			x: 0,
			y: 0
		})

		const stickStarters: StickStarters = {
			setVector,
			getTrackingMouse,
			setTrackingMouse,
			getTrackingTouchId,
			setTrackingTouchId,
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
		const setCenterPosition = (e: PointerEvent) => {
			setStick(true)
			const {clientWidth, clientHeight} = this.nubStickBasePart
			setPosition(`left: ${e.pageX - clientWidth / 2}px; top: ${e.pageY - clientHeight / 2}px;`)
		}

		const stickPadStarters: StickpadStarters = {
			setStick,
			stickPad: this,
			setCenterPosition
		}

		use.setup(setupStickpadEvents({...stickPadStarters}))

		const controls = prepDomControls(stickStarters)
		const baseEvents = prepBaseEvents({...stickStarters, ...controls})

		use.setup(setupWindowEvents({...stickStarters, ...controls}))
		use.setup(setupBaseEvents(this, baseEvents))

		return html`
			<nub-stick-graphic .vector=${vector} ?data-visible=${stick} style=${position}></nub-stick-graphic>
		`
	}
}
