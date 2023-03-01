
import {NubCauseEvent} from "../../../events/cause.js"
import {attachEvents} from "../../../tools/attach-events.js"
import {EventTargeting} from "../../../framework/types/event-targeting.js"

export function setup_keyboard_listening({
		listenTo,
		dispatchTo,
	}: EventTargeting) {

	const {dispatch} = NubCauseEvent.target(dispatchTo)

	function dispatchCause({code, repeat}: KeyboardEvent, pressed: boolean) {
		if (!repeat)
			dispatch({
				pressed,
				kind: "key",
				cause: code,
			})
	}

	const pressed = true
	const unpressed = false

	return () => attachEvents(listenTo, {
		keydown: (event: KeyboardEvent) => dispatchCause(event, pressed),
		keyup: (event: KeyboardEvent) => dispatchCause(event, unpressed),
	})
}
