
import {BaseEvents} from "./prep-base-events.js"
import {NubStick} from "../elements/stick/element.js"
import {attachEvents} from "../tools/attach-events.js"
import {NubStickpad} from "../elements/stickpad/element.js"

export function setupBaseEvents(
		nubStick: NubStick | NubStickpad,
		baseEvents: BaseEvents
	) {

	return () => attachEvents(nubStick, baseEvents)
}
