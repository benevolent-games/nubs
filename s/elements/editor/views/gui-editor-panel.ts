
import {html} from "lit"
import {view} from "@chasemoskal/magical"

import {buttonLabels} from "../utils/constants.js"
import {AssignKeybind, Waiting} from "../types.js"
import {NubCauseEvent} from "../../../events/cause.js"
import {Bindings} from "../../context/bindings/types/bindings.js"
import {controlKeybindAssignments} from "../utils/setup-listen-to-inputs-and-actuate-key-bind-assignment.js"

export const GuiEditorPanelView = view({}, use => ({
		bindings,
		eventTarget,
		onResetDefaults,
		onKeybindAssignment,
	}: {
		bindings: Bindings
		eventTarget: EventTarget
		onResetDefaults: () => void
		onKeybindAssignment: AssignKeybind
	}) => {

	const [waiting, setWaiting, getWaiting]
		= use.state<undefined | Waiting>(undefined)

	use.setup(() => NubCauseEvent
		.target(eventTarget)
		.listen(controlKeybindAssignments({
			getWaiting,
			setWaiting,
			onKeybindAssignment,
		}))
	)

	return html`
		<div data-panel=easy-editor>

			<div class=buttons>
				<button @click=${onResetDefaults}>
					${buttonLabels.resetDefaults}
				</button>
			</div>
		</div>
	`
})

			// <div class=keybindlist>
			// 	${Object
			// 		.entries(bindings.key)
			// 		.map(renderKeybind(waiting, setWaiting))}
			// </div>
