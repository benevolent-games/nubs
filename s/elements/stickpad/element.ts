import {html} from "lit"
import {MagicElement, mixinCss} from "@chasemoskal/magical"
import * as v2 from "../../tools/v2.js"
import {Nub} from "../../types.js"

import styles from "./style.css.js"
import {property} from "lit/decorators.js"
import {StickpadStarters} from "./types.js"
import {StickStarters} from "../stick/types.js"
import {NubInputEvent} from "../../events/input.js"
import {prepBaseEvents} from "../../setups/prep-base-events.js"
import {prepDomControls} from "../../setups/prep-dom-controls.js"
import {setupBaseEvents} from "../../setups/setup-base-events.js"
import {setupStickpadEvents} from "./setups/setup-stickpad-events.js"
import {setupWindowEvents} from "../../setups/setup-window-events.js"
import {NubStickGraphic} from "../../graphics/nub-stick-graphic/element.js"

@mixinCss(styles)
export class NubStickpad extends MagicElement {

	@property({type: String, reflect: true})
	name: string = "1"

	get nubStickGraphicParts() {
		const {basePart, stickPart} = this.shadowRoot?.querySelector("nub-stick-graphic") as NubStickGraphic
		return {basePart, stickPart} as {basePart: HTMLElement, stickPart: HTMLElement}
	}

	realize() {
		const {use} = this

		const [isVisible, setVisibility] = use.state(false)
		const [position, setPosition] = use.state("")
		
		const [, setTrackingPointerId, getTrackingPointerId] =
			use.state<number | undefined>(undefined)

		const [vector, setVector] = use.state<v2.V2>([0, 0])

		const stickStarters: StickStarters & StickpadStarters = {
			setVector,
			getTrackingPointerId,
			setTrackingPointerId,
			query: () => ({
				base: this.nubStickGraphicParts.basePart,
				stick: this.nubStickGraphicParts.stickPart
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
			setCenterPosition: (e: PointerEvent) => {
				setVisibility(true)
				const {clientWidth, clientHeight} = this.nubStickGraphicParts.basePart 
				setPosition(`left: ${e.pageX - clientWidth / 2}px; top: ${e.pageY - clientHeight / 2}px;`)
			},
			stickPad: this,
			setVisibility
		}

		const controls = prepDomControls(stickStarters)
		const baseEvents = prepBaseEvents({...stickStarters, ...controls})
		
		use.setup(setupBaseEvents(this, baseEvents))
		use.setup(setupStickpadEvents({...stickStarters}))
		use.setup(setupWindowEvents({...stickStarters, ...controls}))

		return html`
			<nub-stick-graphic
				.vector=${vector}
				?data-visible=${isVisible}
				style=${position}>
			</nub-stick-graphic>
		`
	}
}
