
import {StateSetter} from "@chasemoskal/magical/x/view/types.js"

import {Waiting} from "../../types.js"
import {KeybindView} from "./keybind.js"

export function renderKeybind(
		waiting: undefined | Waiting,
		setWaiting: StateSetter<undefined | Waiting>,
	) {

	return ([action, keycodes]: [string, string[]]) => KeybindView({
		action,
		keycodes,
		waiting,
		onClickRebind(keyIndex) {
			setWaiting({
				action,
				keyIndex,
			})
		},
		onClickAddNewBind() {
			setWaiting({
				action,
				keyIndex: keycodes.length,
			})
		},
	})
}
