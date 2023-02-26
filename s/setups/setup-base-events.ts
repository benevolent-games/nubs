import {attachEvents} from "../tools/attach-events.js"
import {NubStickpad} from "../elements/stickpad/element.js"
import {NubStick} from "../main.js"
import {BaseEvents} from "./prep-base-events.js"

export function setupBaseEvents(
	nubStick: NubStick | NubStickpad,
	baseEvents: BaseEvents)
{
	return () => attachEvents(nubStick, {
		pointerdown: baseEvents.pointerdown,
		pointermove: baseEvents.pointermove,
		pointerup: baseEvents.pointerup
	})
}
