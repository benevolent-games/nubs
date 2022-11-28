
import {StateSetter} from "@chasemoskal/magical/x/view/types.js"

import {KeybindView} from "../views/keybind.js"
import {WaitingForAssignment} from "../types.js"

export function renderKeybind(
		waitingForAssignment: undefined | WaitingForAssignment,
		setWaitingForAssignment: StateSetter<undefined | WaitingForAssignment>,
	) {

	return ([action, keycodes]: [string, string[]]) => KeybindView({
		action,
		keycodes,
		waitingForAssignment,
		onClickRebind(keyIndex) {
			setWaitingForAssignment({
				action,
				keyIndex,
			})
		},
		onClickAddNewBind() {
			setWaitingForAssignment({
				action,
				keyIndex: keycodes.length,
			})
		},
	})
}
