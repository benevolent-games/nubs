
import {StateSetter} from "@chasemoskal/magical/x/view/types.js"

import {Waiting} from "../types.js"
import {Bindings, Nub} from "../../../types.js"
import {NubInputEvent} from "../../../events/input.js"
import {NubContext} from "../../context/element.js"
import {setupEventListener} from "./setup-event-listeners.js"

export function setupListenToInputsAndActuateKeyBindAssignment({
		context,
		getWaiting,
		setWaiting,
	}: {
		context: NubContext
		getWaiting: () => undefined | Waiting
		setWaiting: StateSetter<undefined | Waiting>
	}) {

	return () => {

		function assignKeyBind(
				action: string,
				keyIndex: number,
				code: string,
			) {
			setWaiting(undefined)
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

		return setupEventListener<NubInputEvent>(
			context,
			NubInputEvent,
			event => {
				const waiting = getWaiting()
				if (waiting && event.detail.type === Nub.Type.Key) {
					const {code, pressed} = event.detail
					const {action, keyIndex} = waiting
					if (pressed)
						assignKeyBind(action, keyIndex, code)
				}
			},
		)
	}
}
