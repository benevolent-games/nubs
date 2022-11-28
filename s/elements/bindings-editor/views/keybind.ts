
import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"

import {WaitingForAssignment} from "../types.js"
import {renderKeycap} from "../utils/render-keycap.js"

export const KeybindView = view(use => ({
		action,
		keycodes,
		waitingForAssignment,
		onClickRebind,
		onClickAddNewBind,
	}: {
		action: string
		keycodes: string[]
		waitingForAssignment: undefined | WaitingForAssignment
		onClickRebind: (keyIndex: number) => void
		onClickAddNewBind: () => void
	}) => {

	const currentlyWaitingForThisAction =
		waitingForAssignment?.action === action

	const showWaitingIndicatorForNewBind =
		currentlyWaitingForThisAction &&
		waitingForAssignment.keyIndex === keycodes.length

	return html`
		<div
			class=keybind
			data-action="${action}"
			?data-assigning=${currentlyWaitingForThisAction}>

			<div class=action>${action}</div>

			<div class=keys>
				${keycodes.map(
					renderKeycap({
						waitingForAssignment,
						currentlyWaitingForThisAction,
						onClickRebind,
					})
				)}

				${(showWaitingIndicatorForNewBind || null) && html`
					<div class=keycap data-selected>
						press key
					</div>
				`}

				${(!waitingForAssignment || null) && html`
					<div
						class=keycap
						data-add-new
						tabindex="0"
						@click=${onClickAddNewBind}>
							add
					</div>
				`}
			</div>
		</div>
	`
})
