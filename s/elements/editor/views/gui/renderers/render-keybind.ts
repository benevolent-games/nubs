
import {StateSetter} from "@chasemoskal/magical"

import {Waiting} from "../types/waiting.js"
import {KeybindView} from "../views/keybind.js"

export function renderKeybind(
		waiting: undefined | Waiting,
		setWaiting: StateSetter<undefined | Waiting>,
		setShowDialog: StateSetter<boolean>
	) {

	return ([effect, keycodes]: [string, string[][]]) => KeybindView({
		effect,
		keycodes,
		waiting,
		onClickRebind(keyIndex) {
			setShowDialog(true)
			setWaiting({
				effect,
				keyIndex,
			})
		},
		onClickAddNewBind() {
			setShowDialog(true)
			setWaiting({
				effect,
				keyIndex: keycodes.length,
			})
		},
	})
}
