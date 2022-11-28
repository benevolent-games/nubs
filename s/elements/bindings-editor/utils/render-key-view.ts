
import {StateSetter} from "@chasemoskal/magical/x/view/types.js"

import {KeysView} from "../views/keys.js"
import {WaitingForAssignment} from "../types.js"

export function renderKeyView(
		waitingForAssignment: undefined | WaitingForAssignment,
		setWaitingForAssignment: StateSetter<undefined | WaitingForAssignment>,
	) {

	return function([action, keycodes]: [string, string[]]) {
		return KeysView({
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
}
