
import {html} from "lit"
import {view} from "@chasemoskal/magical"

import {buttonLabels} from "../../../utils/constants.js"

export const KeycapView = view({shadow: false}, use => ({
		code,
		keyIndex,
		isWaiting,
		onClickRebind,
	}: {
		code: string
		keyIndex: number
		isWaiting: boolean
		onClickRebind: (event: MouseEvent) => void
	}) => {

	return isWaiting
		? html`
			<button
				class=keycap
				data-waiting
				data-key=${keyIndex}>
					${buttonLabels.waitingForKeyPress}
			</button>
		`
		: html`
			<button
				class=keycap
				data-key=${keyIndex}
				@click=${onClickRebind}>
					${code}
			</button>
		`
})
