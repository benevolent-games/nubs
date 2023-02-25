
import {html} from "lit"
import {view} from "@chasemoskal/magical"

import {buttonLabels} from "../utils/constants.js"
import {AssignKeybind, Waiting} from "../types.js"
import {Bindings} from "../../../bindings/types.js"
import {renderKeybind} from "./easy/render-keybind.js"
import {NubInputEvent} from "../../../events/input.js"
import {controlKeybindAssignments} from "../utils/setup-listen-to-inputs-and-actuate-key-bind-assignment.js"

export const EasyEditorPanelView = view({}, use => ({
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

	use.setup(() => NubInputEvent
		.target(eventTarget)
		.listen(controlKeybindAssignments({
			getWaiting,
			setWaiting,
			onKeybindAssignment,
		}))
	)

	return html`
		<div data-panel=easy-editor>
			<div class=keybindlist>
				${Object
					.entries(bindings.key)
					.map(renderKeybind(waiting, setWaiting))}
			</div>

			<div class=buttons>
				<button @click=${onResetDefaults}>
					${buttonLabels.resetDefaults}
				</button>
			</div>
		</div>
	`
})
