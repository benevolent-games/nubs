
import {html} from "lit"
import {component2 as element} from "@chasemoskal/magical/x/component.js"

import {Waiting} from "./types.js"
import {styles} from "./style.css.js"
import {Bindings} from "../../types.js"
import {buttonLabels} from "./utils/constants.js"
import {stateForClosestContext} from "./utils/state-for-closest-context.js"
import {renderKeybind as renderKeybindView} from "./utils/render-keybind.js"
import {setupListenForBindingsChanges} from "./utils/setup-listen-for-bindings-changes.js"
import {setupListenToInputsAndActuateKeyBindAssignment} from "./utils/setup-listen-to-inputs-and-actuate-key-bind-assignment.js"

export const NubBindingsEditor = element({
		styles,
		shadow: true,
	}).render(use => {

	const [context] =
		use.state(
			stateForClosestContext(use.element)
		)

	const [bindings, setBindings] =
		use.state<Bindings>(
			() => context.getBindings()
		)

	const [waiting, setWaiting, getWaiting] =
		use.state<undefined | Waiting>(undefined)

	use.setup(
		setupListenForBindingsChanges(context, setBindings)
	)

	use.setup(
		setupListenToInputsAndActuateKeyBindAssignment({
			context,
			getWaiting,
			setWaiting,
		})
	)

	return html`
		<div class=keybindlist>
			${Object
				.entries(bindings["*️⃣"])
				.map(renderKeybindView(waiting, setWaiting))}
		</div>

		<div class=buttons>
			<button @click=${context.restoreBindingsToDefaults}>
				${buttonLabels.resetDefaults}
			</button>
		</div>
	`
})
