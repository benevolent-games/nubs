
import {html} from "lit"
import {component2 as element} from "@chasemoskal/magical/x/component.js"

import {Nub} from "../../types.js"
import styles from "./style.css.js"
import * as v2 from "../../tools/v2.js"
import {StickStarters} from "./types.js"
import {NubInputEvent} from "../../events/input.js"
import {prepBaseEvents} from "./setups/prep-base-events.js"
import {prepDomControls} from "./setups/prep-dom-controls.js"
import {setupWindowEvents} from "./setups/setup-window-events.js"

export const NubStick = element<{
		name: string
	}>({
		styles,
		shadow: true,
		properties: {
			name: {type: String, reflect: true},
		},
	}).render(use => {

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
			base: use.element.shadowRoot!.querySelector(".base")!,
			stick: use.element.shadowRoot!.querySelector(".stick")!,
		}),
		triggerInput(vector: v2.V2) {
			NubInputEvent
				.target(use.element)
				.dispatch({
					vector,
					type: Nub.Type.Vector2,
					name: use.element.name,
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
})
