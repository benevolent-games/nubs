import {attachEvents} from "../../../tools/attach-events.js"
import {StickpadStarters} from "../types.js"

export function setupStickpadEvents(
	{
	stickPad,
	setStick,
	setCenterPosition
	}: StickpadStarters) {

	return () => {
		attachEvents(window, {
			pointerup() {setStick(false)}
		})
		attachEvents(stickPad, {
			pointerdown(e) {
				const ev = <PointerEvent>e
				setCenterPosition(ev)
			}
		})
	}
}
