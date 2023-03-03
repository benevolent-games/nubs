
import {Keylog} from "./keylog.js"
import {NubCauseEvent} from "../../../events/cause.js"
import {NubDetail} from "../../../events/types/detail.js"

export function listenForKeyEventsAndUpdateKeylog(
		target: EventTarget,
		getKeylog: () => Keylog,
		setKeylog: (k: Keylog) => void,
	) {

	return () => NubCauseEvent
		.target(target)
		.listen(({detail}) => {

			const key = detail.kind === "key"
				? detail as NubDetail.Key
				: undefined

			if (key)
				setKeylog({...getKeylog(), [key.cause]: key})
		})
}
