
import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"

import {WaitingForAssignment} from "../types.js"
import {renderKeycapView} from "../utils/render-keycap-view.js"

export const KeysView = view(use => ({
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

	const showAddButton = !currentlyWaitingForThisAction

	const showWaitingIndicatorForNewBind =
		currentlyWaitingForThisAction &&
		waitingForAssignment.keyIndex === keycodes.length

	return html`
		<div
			class=container
			data-action="${action}"
			?data-assigning=${currentlyWaitingForThisAction}>

			<div class=action>${action}</div>

			<div class=keybinds>
				${keycodes.map(
					renderKeycapView({
						waitingForAssignment,
						currentlyWaitingForThisAction,
						onClickRebind,
					})
				)}

				${showWaitingIndicatorForNewBind ? html`
					<div class=bind>
						<span class=info-key>press key</span>
					</div>
				` : null}

				${showAddButton ? html`
					<div class=add-bind>
						<span
							class=add-key
							@click=${onClickAddNewBind}>+</span>
					</div>
				` : null}
			</div>
		</div>
	`
})
