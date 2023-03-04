
import {StateSetter} from "@chasemoskal/magical/x/view/types.js"

import {Waiting} from "../types/waiting.js"
import {NubCauseEvent} from "../../../../../events/cause.js"
import {Bindings} from "../../../../context/bindings/types/bindings.js"

export function controlKeybindAssignments({
		getMode,
		getBindingsDraft,
		setBindingsDraft,
		getWaiting,
		setWaiting,
	}: {
		getMode: () => string
		getBindingsDraft: () => Bindings
		setBindingsDraft: (b: Bindings) => void
		getWaiting: () => undefined | Waiting
		setWaiting: StateSetter<undefined | Waiting>
	}) {

	return (event: NubCauseEvent) => {
		const waiting = getWaiting()

		if (waiting && event.detail.kind === "key") {
			const {cause, pressed} = event.detail
			const {effect, keyIndex} = waiting

			if (pressed) {
				setWaiting(undefined)

				const mode = getMode()
				const bindings = getBindingsDraft()
				const isEscapeKey = cause === "Escape"
				const keybinds = bindings[mode].key[effect]
				const redundant = keybinds.some(c => c === cause)

				if (!redundant) {
					if (isEscapeKey)
						keybinds.splice(keyIndex, 1)
					else
						keybinds[keyIndex] = cause

					setBindingsDraft(bindings)
				}
			}
		}
	}
}
