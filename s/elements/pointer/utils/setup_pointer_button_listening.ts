
import {NubCauseEvent} from "../../../events/cause.js"
import {attachEvents} from "../../../tools/attach-events.js"
import {EventTargeting} from "../../../framework/types/event-targeting.js"
import {convert_mouse_button_to_cause} from "./convert_mouse_button_to_cause.js"

export function setup_pointer_button_listening({
		listenTo,
		dispatchTo,
	}: EventTargeting) {

	const {dispatch} = NubCauseEvent.target(dispatchTo)

	function dispatcherForPressed(pressed: boolean) {
		return (event: PointerEvent) => dispatch({
			pressed,
			kind: "key",
			cause: convert_mouse_button_to_cause(event.button),
		})
	}

	return () => attachEvents(listenTo, {
		pointerdown: dispatcherForPressed(true),
		pointerup: dispatcherForPressed(false),
	})
}
