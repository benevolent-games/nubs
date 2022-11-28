
import {StateSetter} from "@chasemoskal/magical/x/view/types.js"

import {Bindings, Nub} from "../../../types.js"
import {WaitingForAssignment} from "../types.js"
import {NubInputEvent} from "../../../events/input.js"
import {NubContextElement} from "../../context/element.js"
import {setupEventListener} from "./setup-event-listeners.js"

export function setupListenToInputsAndActuateKeyBindReassignment({
		context,
		getWaitingForAssignment,
		setWaitingForAssignment,
	}: {
		context: NubContextElement
		getWaitingForAssignment: () => undefined | WaitingForAssignment
		setWaitingForAssignment: StateSetter<undefined | WaitingForAssignment>
	}) {

	return () => {
		function reassignKeyBind(
				action: string,
				keyIndex: number,
				code: string,
			) {
			const bindings = <Bindings>structuredClone(context.getBindings())
			bindings["*️⃣"][action][keyIndex] = code
			context.updateBindings(bindings)
			setWaitingForAssignment(undefined)
		}

		return setupEventListener(context, NubInputEvent, e => {
			const waiting = getWaitingForAssignment()
			if (waiting) {
				const event = <NubInputEvent>e
				if (event.detail.type === Nub.Type.Key) {
					const detail = <Nub.Detail.Key>event.detail
					const {action, keyIndex} = waiting
					reassignKeyBind(action, keyIndex, detail.code)
				}
			}
		})
	}
}
