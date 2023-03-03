
import {DispatchCause} from "../types.js"
import {NubCauseEvent} from "../../../events/cause.js"

export const makeCauseDispatcher = (
	(target: EventTarget): DispatchCause =>
		({cause, pressed}) =>
			NubCauseEvent
				.target(target)
				.dispatch({
					kind: "key",
					cause,
					pressed,
				})
)
