
import {html} from "lit"
import {view} from "@chasemoskal/magical"

import {when} from "../../../tools/when.js"
import {Waiting} from "./gui/types/waiting.js"
import {GuiOptions} from "./gui/types/gui-options.js"
import {NubCauseEvent} from "../../../events/cause.js"
import {renderKeybind} from "./gui/renderers/render-keybind.js"
import {BindingsDialogView} from "./gui/views/bindings-dialog.js"
import {controlKeybindAssignments} from "./gui/utils/control-keybind-assignments.js"

export const GuiEditorPanelView = view({}, use => ({
		bindingsDraft,
		setBindingsDraft,
		getBindingsDraft,

		availableModes,
		getMode,
		setMode,

		listenForCauseEventsOn,
	}: GuiOptions) => {

	const [waiting, setWaiting, getWaiting] =
		use.state<undefined | Waiting>(undefined)

	const [showDialog, setShowDialog, getShowDialog] =
		use.state(false)

	const [keysPressed, setKeysPressed, getKeysPressed] =
		use.state<string[]>([])

	use.setup(() =>
		NubCauseEvent
			.target(listenForCauseEventsOn)
			.listen(controlKeybindAssignments({
				getMode,
				getWaiting,
				setWaiting,
				getBindingsDraft,
				setBindingsDraft,
				setKeysPressed,
				getShowDialog,
				setShowDialog,
				getKeysPressed
			}))
	)

	const mode = getMode()
	const kindbinds = bindingsDraft.modes[mode]
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
					.map(renderKeybind(waiting, setWaiting, setShowDialog))}
			</div>

			${when(showDialog, () => BindingsDialogView({
				keysPressed,
				setKeysPressed
			}))}

		</div>
	`
})
