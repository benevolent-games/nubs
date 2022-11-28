
import {KeycapView} from "../views/keycap.js"
import {WaitingForAssignment} from "../types.js"

export function renderKeycapView({
		waitingForAssignment,
		currentlyWaitingForThisAction,
		onClickRebind,
	}: {
		currentlyWaitingForThisAction: boolean
		waitingForAssignment: undefined | WaitingForAssignment
		onClickRebind: (keyIndex: number) => void
	}) {

	return function renderKeycapView(code: string, keyIndex: number) {
		return KeycapView({

			keyIndex,

			code: code ? code : "-",

			isSelected: currentlyWaitingForThisAction &&
				waitingForAssignment?.keyIndex === keyIndex,

			onClickRebind(event) {
				if (!waitingForAssignment) {
					event.preventDefault()
					onClickRebind(keyIndex)
				}
			},
		})
	}
}
