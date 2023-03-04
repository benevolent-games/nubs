
import {NubCauseEvent} from "../../../events/cause.js"
import {attachEvents} from "../../../tools/attach-events.js"

export function setupPointerListening({
		dispatchCauseEventsOn,
		listenForPointerEventsOn,
		getCause,
	}: {
		dispatchCauseEventsOn: EventTarget
		listenForPointerEventsOn: EventTarget
		getCause: () => string
	}) {

	let isPointerDown = false

	return () => attachEvents(listenForPointerEventsOn, {

		pointerdown() {
			isPointerDown = true
		},

		pointermove({movementX, movementY, clientX, clientY}: PointerEvent) {
			if (isPointerDown)
				NubCauseEvent
					.target(dispatchCauseEventsOn)
					.dispatch({
						kind: "pointer",
						cause: getCause(),
						position: [clientX, clientY],
						movement: [movementX, movementY],
					})
		},

		pointerup() {
			isPointerDown = false
		},

	})
}
