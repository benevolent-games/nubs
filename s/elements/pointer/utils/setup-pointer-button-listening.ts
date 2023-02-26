
import {NubCauseEvent} from "../../../events/cause.js"
import {attachEvents} from "../../../tools/attach-events.js"
import {EventTargeting} from "../../../framework/types/event-targeting.js"
import {convertMouseButtonToCause} from "./convert-mouse-button-to-cause.js"

export function setupPointerButtonListening({
		listenTo,
		dispatchTo,
	}: EventTargeting) {

	const {dispatch} = NubCauseEvent.target(dispatchTo)

	function dispatcherForPressed(pressed: boolean) {
		return (event: PointerEvent) => dispatch({
			pressed,
			kind: "key",
			cause: convertMouseButtonToCause(event.button),
		})
	}

	return () => attachEvents(listenTo, {
		pointerdown: dispatcherForPressed(true),
		pointerup: dispatcherForPressed(false),
	})
}
