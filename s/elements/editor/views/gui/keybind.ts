
import {html} from "lit"
import {view} from "@chasemoskal/magical"

import {Waiting} from "../../types.js"
import {renderKeycap} from "./render-keycap.js"
import {buttonLabels} from "../../utils/constants.js"

export const KeybindView = view({}, use => ({
		effect,
		keycodes,
		waiting,
		onClickRebind,
		onClickAddNewBind,
	}: {
		effect: string
		keycodes: string[]
		waiting: undefined | Waiting
		onClickRebind: (keyIndex: number) => void
		onClickAddNewBind: () => void
	}) => {

	const currentlyWaitingForThisAction =
		waiting?.effect === effect

	const showWaitingIndicatorForNewBind =
		currentlyWaitingForThisAction &&
		waiting.keyIndex === keycodes.length

	return html`
		<div
			class=keybind
			data-action="${effect}"
			?data-assigning=${currentlyWaitingForThisAction}>

			<div class=action>${effect}</div>

			<div class=keys>
				${keycodes.map(
					renderKeycap({
						waiting,
						currentlyWaitingForThisAction,
						onClickRebind,
					})
				)}

				${(showWaitingIndicatorForNewBind || null) && html`
					<button class=keycap data-waiting>
						${buttonLabels.waitingForKeyPress}
					</button>
				`}

				${(!waiting || null) && html`
					<button
						class=keycap
						data-add-new
						@click=${onClickAddNewBind}>
							${buttonLabels.addNewKeyBind}
					</button>
				`}
			</div>
		</div>
	`
})
