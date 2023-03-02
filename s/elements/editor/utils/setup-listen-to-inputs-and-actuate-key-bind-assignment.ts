
import {AssignKeybind, Waiting} from "../types.js"
import {StateSetter} from "@chasemoskal/magical/x/view/types.js"
import {NubCauseEvent} from "../../../events/cause.js"

export function controlKeybindAssignments({
		getWaiting,
		setWaiting,
		onKeybindAssignment,
	}: {
		onKeybindAssignment: AssignKeybind
		getWaiting: () => undefined | Waiting
		setWaiting: StateSetter<undefined | Waiting>
	}) {

	return (event: NubCauseEvent) => {
		const waiting = getWaiting()
		if (waiting && event.detail.kind === "key") {
			const {cause, pressed} = event.detail
			const {effect, keyIndex} = waiting
			if (pressed) {
				onKeybindAssignment(effect, keyIndex, cause)
				setWaiting(undefined)
			}
		}
	}
}
