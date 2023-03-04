
import {html} from "lit"
import {property} from "lit/decorators.js"
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import styles from "./style.css.js"
import {V2} from "../../tools/v2.js"
import {StickpadStarters} from "./types.js"
import {StickStarters} from "../stick/types.js"
import {NubCauseEvent} from "../../events/cause.js"
import {prepBaseEvents} from "../../setups/prep-base-events.js"
import {prepDomControls} from "../../setups/prep-dom-controls.js"
import {setupBaseEvents} from "../../setups/setup-base-events.js"
import {setupStickpadEvents} from "./setups/setup-stickpad-events.js"
import {setupWindowEvents} from "../../setups/setup-window-events.js"
import {NubStickGraphic} from "../../graphics/nub-stick-graphic/element.js"

@mixinCss(styles)
export class NubStickpad extends MagicElement {

	@property({type: String, reflect: true})
	cause: string = "Stickpad"

	get nubStickGraphic() {
		const nubStickGraphic = this.shadowRoot?.querySelector("nub-stick-graphic") as NubStickGraphic
		return nubStickGraphic
	}

	realize() {
		const {use} = this

		const [isVisible, setVisibility] = use.state(false)
		const [position, setPosition] = use.state("")
		
		const [, setTrackingPointerId, getTrackingPointerId] =
			use.state<number | undefined>(undefined)

		const [vector, setVector] = use.state<V2>([0, 0])

		const stickStarters: StickStarters & StickpadStarters = {
			setVector,
			getTrackingPointerId,
			setTrackingPointerId,
			query: () => ({
				base: this.nubStickGraphic.basePart as HTMLElement,
				stick: this.nubStickGraphic.stickPart as HTMLElement
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
			setCenterPosition: (e: PointerEvent) => {
				setVisibility(true)
				const {clientWidth, clientHeight} = this.nubStickGraphic.basePart as HTMLElement
				const {left} = this.getBoundingClientRect()
				setPosition(`left: ${e.clientX - left - clientWidth / 2}px; top: ${e.offsetY - clientHeight / 2}px;`)
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
				style=${this.nubStickGraphic
				?.hasAttribute("data-visible")
					? position
					: `inset: 0; margin: auto;`}>
			</nub-stick-graphic>
		`
	}
}
