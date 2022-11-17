
import {StickControls, StickStarters} from "../types.js"
import {attachEvents} from "../../../tools/attach-events.js"

export function setupWindowEvents({
		setTrackingMouse,
		getTrackingMouse,
		moveStick,
		resetStick,
	}: StickStarters & StickControls) {

	return () => attachEvents(window, {
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
	})
}
