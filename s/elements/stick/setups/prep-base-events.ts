
import {StickControls, StickStarters} from "../types.js"
import {asLitListener} from "../../../tools/lit-listener.js"
import {findTouchAppleFriendly} from "../../../tools/find-touch-ios-friendly.js"

export type BaseEvents = ReturnType<typeof prepBaseEvents>

export function prepBaseEvents({
		moveStick,
		resetStick,
		setTrackingPointerId,
		getTrackingPointerId,
	}: StickStarters & StickControls) {

	return {
		pointerdown: asLitListener<PointerEvent>({
			handleEvent(event) {
				event.preventDefault()
				setTrackingPointerId(event.pointerId)
				moveStick(event.clientX, event.clientY)
			},
		}),
		pointermove: asLitListener<PointerEvent>({
			passive: false,
			handleEvent(event) {
				const pointer = findTouchAppleFriendly(getTrackingPointerId(), event.getCoalescedEvents())
				if (pointer) {
					const {clientX, clientY} = pointer
					moveStick(clientX, clientY)
				}
				event.preventDefault()
			},
		}),
		pointerup: asLitListener<PointerEvent>({
			handleEvent() {
				setTrackingPointerId(undefined)
				resetStick()
			},
		})
	}
}
