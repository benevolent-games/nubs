
import {StateGetter, StateSetter} from "@chasemoskal/magical/x/view/types.js"

import {Waiting} from "../types/waiting.js"
import {NubCauseEvent} from "../../../../../events/cause.js"
import {Bindings2} from "../../../../context/bindings/types/bindings.js"
import {compareStringArrays} from "../../../../../tools/compare-string-arrays.js"

export function controlKeybindAssignments({
		getMode,
		getWaiting,
		setWaiting,
		getShowDialog,
		setShowDialog,
		setKeysPressed,
		getKeysPressed,
		getBindingsDraft,
		setBindingsDraft,
	}: {
		getMode: () => string
		getBindingsDraft: () => Bindings2
		setBindingsDraft: (b: Bindings2) => void
		getShowDialog: StateGetter<boolean>
		setShowDialog: StateSetter<boolean>
		getKeysPressed: StateGetter<string[]>
		setKeysPressed: StateSetter<string[]>
		getWaiting: StateGetter<Waiting | undefined>
		setWaiting: StateSetter<undefined | Waiting>
	}) {

	const key_set = new Set<string>()

	return (event: NubCauseEvent) => {
		const waiting = getWaiting()
		const is_dialog_shown = getShowDialog()

		if (waiting && event.detail.kind === "key") {
			const {cause, pressed} = event.detail
			const {effect, keyIndex} = waiting
			
			if (pressed) {
				const isEscapeKey = cause === "Escape"

				if (is_dialog_shown) {
					if (isEscapeKey) {
						setShowDialog(false)
						setWaiting(undefined)
						key_set.clear()
					}
					else {
						key_set.add(cause)
						setKeysPressed(Array.from(key_set))
					}
				}

				const mode = getMode()
				const bindings = getBindingsDraft()
				const combo_cause = getKeysPressed()
				const keybinds = bindings.modes[mode].key[effect]
				const redundant = keybinds.some(c => compareStringArrays(c, combo_cause))

				if (!redundant) {
					if (isEscapeKey)
						keybinds.splice(keyIndex, 1)
					else
						keybinds[keyIndex] = combo_cause

					setBindingsDraft(bindings)
				}
			}
		}
	}
}
