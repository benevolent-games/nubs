
import {html} from "lit"
import {view} from "@chasemoskal/magical"

import {Waiting} from "./gui/types/waiting.js"
import {renderKeybind} from "./gui/render-keybind.js"
import {NubCauseEvent} from "../../../events/cause.js"
import {Bindings} from "../../context/bindings/types/bindings.js"
import {controlKeybindAssignments} from "../utils/control-keybind-assignments.js"

export const GuiEditorPanelView = view({}, use => ({
		eventTarget,
		availableModes,
		getMode,
		setMode,
		getBindings,
		setBindings,
	}: {
		eventTarget: EventTarget
		availableModes: string[]
		getMode: () => string
		setMode: (mode: string) => void
		getBindings: () => Bindings
		setBindings: (b: Bindings) => void
	}) => {

	const [waiting, setWaiting, getWaiting] =
		use.state<undefined | Waiting>(undefined)

	use.setup(() =>
		NubCauseEvent
			.target(eventTarget)
			.listen(controlKeybindAssignments({
				getWaiting,
				setWaiting,
				getBindings,
				setBindings,
				getMode,
			}))
	)

	const mode = getMode()
	const bindings = getBindings()
	const kindbinds = bindings[mode]
	const keybinds = kindbinds?.key ?? {}

	return html`
		<div data-panel=gui-editor>

			<div class=modetabs>
				${availableModes.map(availableMode => html`
					<button
						?data-is-current=${availableMode === mode}
						@click=${() => setMode(availableMode)}>
						${availableMode}
					</button>
				`)}
			</div>

			<div class=keybindlist>
				${Object
					.entries(keybinds)
					.map(renderKeybind(waiting, setWaiting))}
			</div>

		</div>
	`
})
