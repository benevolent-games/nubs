
import {Nub} from "../../../types.js"
import {AssignKeybind, Waiting} from "../types.js"
import {NubInputEvent} from "../../../events/input.js"
import {StateSetter} from "@chasemoskal/magical/x/view/types.js"

export function controlKeybindAssignments({
		getWaiting,
		setWaiting,
		onKeybindAssignment,
	}: {
		onKeybindAssignment: AssignKeybind
		getWaiting: () => undefined | Waiting
		setWaiting: StateSetter<undefined | Waiting>
	}) {

	return (event: NubInputEvent) => {
		const waiting = getWaiting()
		if (waiting && event.detail.type === Nub.Type.Key) {
			const {code, pressed} = event.detail
			const {action, keyIndex} = waiting
			if (pressed) {
				onKeybindAssignment(action, keyIndex, code)
				setWaiting(undefined)
			}
		}
	}
}
