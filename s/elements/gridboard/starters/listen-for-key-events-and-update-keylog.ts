
import {Keylog} from "./keylog.js"
import {Nub} from "../../../types.js"
import {NubInputEvent} from "../../../events/input.js"

export function listenForKeyEventsAndUpdateKeylog(
		target: EventTarget,
		getKeylog: () => Keylog,
		setKeylog: (k: Keylog) => void,
	) {

	return () => NubInputEvent
		.target(target)
		.listen(({detail}) => {

			const key = detail.type === Nub.Type.Key
				? detail as Nub.Detail.Key
				: undefined

			if (key) {
				setKeylog({
					...getKeylog(),
					[key.code]: key,
				})
			}
		})
}
