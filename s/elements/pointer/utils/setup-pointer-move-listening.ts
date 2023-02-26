
import {NubCauseEvent} from "../../../events/cause.js"
import {attachEvents} from "../../../tools/attach-events.js"
import {EventTargeting} from "../../../framework/types/event-targeting.js"

export function setupPointerMoveListening({
		listenTo,
		dispatchTo,
		getCause,
	}: EventTargeting & {
		getCause: () => string
	}) {

	const {dispatch} = NubCauseEvent.target(dispatchTo)

	return () => attachEvents(listenTo, {
		pointermove: (e: PointerEvent) => dispatch({
			kind: "pointer",
			movement: [e.movementX, e.movementY],
			position: [e.clientX, e.clientY],
			cause: getCause(),
		}),
	})
}
