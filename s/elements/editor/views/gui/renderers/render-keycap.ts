
import {Waiting} from "../types/waiting.js"
import {KeycapView} from "../views/keycap.js"

export function renderKeycap({
		waiting,
		currentlyWaitingForThisEffect,
		onClickRebind,
	}: {
		currentlyWaitingForThisEffect: boolean
		waiting: undefined | Waiting
		onClickRebind: (keyIndex: number) => void
	}) {

	return (code: string, keyIndex: number) => KeycapView({

		keyIndex,

		code: code ? code : "-",

		isWaiting: (
			currentlyWaitingForThisEffect &&
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
