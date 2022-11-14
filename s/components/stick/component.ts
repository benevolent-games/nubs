
import {html} from "lit"
import {component} from "@chasemoskal/magical/x/component.js"

import styles from "./style.css.js"
import * as v2 from "../../tools/v2.js"
import {attachEvents} from "../../tools/attach-events.js"
import {asLitListener} from "../../tools/lit-listener.js"
import {findTouchAppleFriendly} from "../../tools/find-touch-ios-friendly.js"
import {setupStickTracking} from "./utils/tracking.js"

export const NubStick = component({
		styles,
		shadow: true,
		properties: {},
	}, use => {

	function triggerInput(values: v2.V2) {

	}

	const [, setTrackingMouse, getTrackingMouse] = use.state(false)
	const [trackingTouchId, setTrackingTouchId] = use.state<number | void>(undefined)
	const [styleTransforms, setStyleTransforms] = use.state({
		stick: "",
		understick: "",
	})

	const {moveStick, resetStick} = setupStickTracking({
		shadow: use.element.shadowRoot!,
		setStyleTransforms,
		triggerInput,
	})

	use.setup(() => attachEvents(window, {
		mouseup() {
			setTrackingMouse(false)
			resetStick()
		},
		mousemove(event) {
			const {clientX, clientY} = <MouseEvent>event
			const trackingMouse = getTrackingMouse()
			if (trackingMouse)
				moveStick(clientX, clientY)
		},
	}))

	const baseEvents = {
		mousedown: asLitListener<MouseEvent>({
			handleEvent({clientX, clientY}) {
				setTrackingMouse(true)
				moveStick(clientX, clientY)
			},
		}),
		touchstart: asLitListener<TouchEvent>({
			passive: false,
			handleEvent(event) {
				const touch = event.targetTouches[0]
				setTrackingTouchId(touch.identifier)
				const {clientX, clientY} = touch
				moveStick(clientX, clientY)
				event.preventDefault()
			},
		}),
		touchmove: asLitListener<TouchEvent>({
			passive: false,
			handleEvent(event) {
				const touch = findTouchAppleFriendly(trackingTouchId!, event.touches)
				if (touch) {
					const {clientX, clientY} = touch
					moveStick(clientX, clientY)
				}
				event.preventDefault()
			},
		}),
		touchend: asLitListener<TouchEvent>({
			handleEvent() {
				setTrackingTouchId(undefined)
				resetStick()
			},
		}),
	}

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
