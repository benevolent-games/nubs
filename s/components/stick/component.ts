
import {html} from "lit"
import {component} from "@chasemoskal/magical/x/component.js"

import styles from "./style.css.js"
import * as v2 from "../../tools/v2.js"
import {StickStarters} from "./types.js"
import {setupBaseEvents} from "./setups/setup-base-events.js"
import {setupWindowEvents} from "./setups/setup-window-events.js"
import {setupTrackingAndDom} from "./setups/setup-tracking-and-dom.js"

export const NubStick = component({
		styles,
		shadow: true,
		properties: {},
	}, use => {

	const [, setTrackingMouse, getTrackingMouse] = use.state(false)
	const [, setTrackingTouchId, getTrackingTouchId] = use.state<number | undefined>(undefined)
	const [styleTransforms, setStyleTransforms] = use.state({stick: "", understick: ""})
	const starters: StickStarters = {
		shadow: use.element.shadowRoot!,
		triggerInput(values: v2.V2) { console.log("nub_input", values) },
		setStyleTransforms,
		getTrackingMouse,
		setTrackingMouse,
		getTrackingTouchId,
		setTrackingTouchId,
	}

	const controls = setupTrackingAndDom(starters)
	const baseEvents = setupBaseEvents({...starters, ...controls})
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
