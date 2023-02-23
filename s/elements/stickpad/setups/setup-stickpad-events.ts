import {attachEvents} from "../../../tools/attach-events.js"
import {StickpadStarters} from "../types.js"

export function setupStickpadEvents(
	{
	stickPad,
	setVisibility,
	setCenterPosition
	}: StickpadStarters) {

	return () =>
		(attachEvents(window, {
			pointerup() {setVisibility(false)}
		}),
		attachEvents(stickPad, {
			pointerdown(e) {
				const ev = <PointerEvent>e
				setCenterPosition(ev)
			}
		}))
}
