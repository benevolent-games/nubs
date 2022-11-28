
import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"
import {StateSetter} from "@chasemoskal/magical/x/view/types.js"

import {WaitingForAssignment} from "../types.js"

export const KeysView = view(use => ({
		action,
		keycodes,
		waitingForAssignment,
		setWaitingForAssignment,
	}: {
		action: string
		keycodes: string[]
		waitingForAssignment: undefined | WaitingForAssignment
		setWaitingForAssignment: StateSetter<undefined | WaitingForAssignment>
	}) => {

	const currentlyWaitingForThisAction =
		waitingForAssignment?.action === action

	const showAddButton = !currentlyWaitingForThisAction

	const showWaitingIndicatorForNewBind = (
		currentlyWaitingForThisAction &&
		waitingForAssignment.keyIndex === keycodes.length
	)

	function clickAddNewKeybind() {
		setWaitingForAssignment({
			action,
			keyIndex: keycodes.length
		})
	}

	return html`
		<div
			class=container
			data-action="${action}"
			?data-assigning=${currentlyWaitingForThisAction}>

			<div class=action>${action}</div>

			<div class=keybinds>
				${keycodes.map((code, keyIndex) => {

					const currentlyWaitingForThisKeyIndex =
						waitingForAssignment?.keyIndex === keyIndex

					const click = (event: MouseEvent) => {
						if (!waitingForAssignment) {
							event.preventDefault()
							setWaitingForAssignment({
								action,
								keyIndex,
							})
						}
					}

					const label = code === ""
						? html`-`
						: code

					const isSelected =
						currentlyWaitingForThisAction &&
						currentlyWaitingForThisKeyIndex

					return html`
						<div
							class=bind
							?data-selected=${isSelected}
							@click=${click}>

							${isSelected ? html`
								<span class=info-key>press key</span>
							` : html`
								<span class=key>${label}</span>
							`}
						</div>
					`
				})}

				${showWaitingIndicatorForNewBind ? html`
					<div class=bind>
						<span class=info-key>press key</span>
					</div>
				` : null}

				${showAddButton ? html`
					<div class=add-bind>
						<span
							class=add-key
							@click=${clickAddNewKeybind}>+</span>
					</div>
				` : null}
			</div>
		</div>
	`
})
