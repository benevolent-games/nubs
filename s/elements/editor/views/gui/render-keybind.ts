
import {StateSetter} from "@chasemoskal/magical"

import {Waiting} from "../../types.js"
import {KeybindView} from "./keybind.js"

export function renderKeybind(
		waiting: undefined | Waiting,
		setWaiting: StateSetter<undefined | Waiting>,
	) {

	return ([effect, keycodes]: [string, string[]]) => KeybindView({
		effect,
		keycodes,
		waiting,
		onClickRebind(keyIndex) {
			setWaiting({
				effect,
				keyIndex,
			})
		},
		onClickAddNewBind() {
			setWaiting({
				effect,
				keyIndex: keycodes.length,
			})
		},
	})
}
