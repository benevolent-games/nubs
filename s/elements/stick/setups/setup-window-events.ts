
import {StickControls, StickStarters} from "../types.js"
import {attachEvents} from "../../../tools/attach-events.js"

export function setupWindowEvents({
		setTrackingPointerId,
		getTrackingPointerId,
		moveStick,
		resetStick,
	}: StickStarters & StickControls) {

	return () => attachEvents(window, {
		pointerup() {
			setTrackingPointerId(undefined)
			resetStick()
		},
		pointermove(event) {
			const {clientX, clientY} = <PointerEvent>event
			const trackingPointer = getTrackingPointerId()
			if (trackingPointer)
				moveStick(clientX, clientY)
		},
	})
}
