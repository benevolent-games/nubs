
import {Nub} from "../../../types.js"
import {AssignKeybind, Waiting} from "../types.js"
import {NubInputEvent} from "../../../events/input.js"
import {setupEventListener} from "./setup-event-listeners.js"
import {StateSetter} from "@chasemoskal/magical/x/view/types.js"

export function setupListenToInputsAndActuateKeyBindAssignment({
		eventTarget,
		getWaiting,
		setWaiting,
		onKeybindAssignment,
	}: {
		eventTarget: EventTarget
		onKeybindAssignment: AssignKeybind
		getWaiting: () => undefined | Waiting
		setWaiting: StateSetter<undefined | Waiting>
	}) {

	return () => setupEventListener<NubInputEvent>(
		eventTarget,
		NubInputEvent,
		event => {
			const waiting = getWaiting()
			if (waiting && event.detail.type === Nub.Type.Key) {
				const {code, pressed} = event.detail
				const {action, keyIndex} = waiting
				if (pressed) {
					onKeybindAssignment(action, keyIndex, code)
					setWaiting(undefined)
				}
			}
		},
	)
}
