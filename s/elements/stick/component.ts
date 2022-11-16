
import {html} from "lit"
import {component} from "@chasemoskal/magical/x/component.js"

import styles from "./style.css.js"
import * as v2 from "../../tools/v2.js"
import {StickStarters} from "./types.js"
import {dispatchNubEvent} from "../../framework/dispatch.js"
import {setupBaseEvents} from "./setups/setup-base-events.js"
import {setupWindowEvents} from "./setups/setup-window-events.js"
import {setupTrackingAndDom} from "./setups/setup-tracking-and-dom.js"

export const NubStick = component<{
		channels: string
	}>({
		styles,
		shadow: true,
		properties: {
			channels: {type: String, reflect: true},
		},
	}, use => {

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
			dispatchNubEvent(use.element)
				.parseChannels(use.element.channels)
				.input
				.vector2({vector})
		},
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