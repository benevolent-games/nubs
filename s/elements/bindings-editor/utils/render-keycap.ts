
import {Waiting} from "../types.js"
import {KeycapView} from "../views/keycap.js"

export function renderKeycap({
		waiting,
		currentlyWaitingForThisAction,
		onClickRebind,
	}: {
		currentlyWaitingForThisAction: boolean
		waiting: undefined | Waiting
		onClickRebind: (keyIndex: number) => void
	}) {

	return (code: string, keyIndex: number) => KeycapView({

		keyIndex,

		code: code ? code : "-",

		isWaiting: (
			currentlyWaitingForThisAction &&
			waiting?.keyIndex === keyIndex
		),

		onClickRebind(event) {
			if (!waiting) {
				event.preventDefault()
				onClickRebind(keyIndex)
			}
		},
	})
}
