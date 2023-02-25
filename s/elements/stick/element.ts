
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
import {setupWindowEvents} from "./setups/setup-window-events.js"

@mixinCss(styles)
export class NubStick extends MagicElement {

	@property({type: String, reflect: true})
	name: string = "1"

	realize() {
		const {use} = this

		const [, setTrackingMouse, getTrackingMouse] =
			use.state(false)

		const [, setTrackingTouchId, getTrackingTouchId] =
			use.state<number | undefined>(undefined)

		const [styleTransforms, setStyleTransforms] =
			use.state({stick: "", understick: ""})

		const starters: StickStarters = {
			setStyleTransforms,
			getTrackingMouse,
			setTrackingMouse,
			getTrackingTouchId,
			setTrackingTouchId,
			query: () => ({
				base: this.shadowRoot!.querySelector(".base")!,
				stick: this.shadowRoot!.querySelector(".stick")!,
			}),
			triggerInput: (vector: v2.V2) => {
				NubInputEvent
					.target(this)
					.dispatch({
						vector,
						name: this.name,
						kind: "vector2",
					})
			},
		}

		const controls = prepDomControls(starters)
		const baseEvents = prepBaseEvents({...starters, ...controls})

		use.setup(setupWindowEvents({...starters, ...controls}))

		return html`
			<div class=base
				@mousedown=${baseEvents.mousedown}
				@touchstart=${baseEvents.touchstart}
				@touchmove=${baseEvents.touchmove}
				@touchend=${baseEvents.touchend}>
					<div class=stick style="${styleTransforms.stick}"></div>
					<div class=understick style="${styleTransforms.understick}"></div>
			</div>
		`
	}
}
