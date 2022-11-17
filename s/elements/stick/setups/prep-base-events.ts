
import {StickControls, StickStarters} from "../types.js"
import {asLitListener} from "../../../tools/lit-listener.js"
import {findTouchAppleFriendly} from "../../../tools/find-touch-ios-friendly.js"

export function prepBaseEvents({
		moveStick,
		resetStick,
		setTrackingMouse,
		setTrackingTouchId,
		getTrackingTouchId,
	}: StickStarters & StickControls) {

	return {
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
				const touch = findTouchAppleFriendly(getTrackingTouchId(), event.touches)
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
}
