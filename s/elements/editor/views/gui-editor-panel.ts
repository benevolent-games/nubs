
import {html} from "lit"
import {view} from "@chasemoskal/magical"

import {Waiting} from "./gui/types/waiting.js"
import {NubCauseEvent} from "../../../events/cause.js"
import {Setter} from "../../../framework/types/setter.js"
import {Getter} from "../../../framework/types/getter.js"
import {renderKeybind} from "./gui/renderers/render-keybind.js"
import {Bindings} from "../../context/bindings/types/bindings.js"
import {controlKeybindAssignments} from "./gui/utils/control-keybind-assignments.js"

export const GuiEditorPanelView = view({}, use => ({
		bindingsDraft,
		setBindingsDraft,
		getBindingsDraft,

		availableModes,
		getMode,
		setMode,

		listenForCauseEventsOn,
	}: {
		bindingsDraft: Bindings
		setBindingsDraft: Setter<Bindings>
		getBindingsDraft: Getter<Bindings>

		availableModes: string[]
		getMode: () => string
		setMode: (mode: string) => void

		listenForCauseEventsOn: EventTarget
	}) => {

	const [waiting, setWaiting, getWaiting] =
		use.state<undefined | Waiting>(undefined)

	use.setup(() =>
		NubCauseEvent
			.target(listenForCauseEventsOn)
			.listen(controlKeybindAssignments({
				getWaiting,
				setWaiting,
				getBindingsDraft,
				setBindingsDraft,
				getMode,
			}))
	)

	const mode = getMode()
	const kindbinds = bindingsDraft[mode]
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
