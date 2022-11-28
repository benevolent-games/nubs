
import {StateSetter} from "@chasemoskal/magical/x/view/types.js"

import {Bindings, Nub} from "../../../types.js"
import {WaitingForAssignment} from "../types.js"
import {NubInputEvent} from "../../../events/input.js"
import {NubContextElement} from "../../context/element.js"
import {setupEventListener} from "./setup-event-listeners.js"

export function setupListenToInputsAndActuateKeyBindAssignment({
		context,
		getWaitingForAssignment,
		setWaitingForAssignment,
	}: {
		context: NubContextElement
		getWaitingForAssignment: () => undefined | WaitingForAssignment
		setWaitingForAssignment: StateSetter<undefined | WaitingForAssignment>
	}) {

	return () => {
		function assignKeyBind(
				action: string,
				keyIndex: number,
				code: string,
			) {
			setWaitingForAssignment(undefined)
			const bindings = <Bindings>structuredClone(context.getBindings())
			const notRedundant = !bindings["*️⃣"][action].some(c => c === code)
			if (notRedundant) {
				const isEscapeKey = code === "Escape"
				if (isEscapeKey)
					bindings["*️⃣"][action].splice(keyIndex, 1)
				else
					bindings["*️⃣"][action][keyIndex] = code
				context.updateBindings(bindings)
			}
		}

		return setupEventListener(context, NubInputEvent, e => {
			const waiting = getWaitingForAssignment()
			if (waiting) {
				const event = <NubInputEvent>e
				if (event.detail.type === Nub.Type.Key) {
					const detail = <Nub.Detail.Key>event.detail
					const {action, keyIndex} = waiting
					assignKeyBind(action, keyIndex, detail.code)
				}
			}
		})
	}
}
