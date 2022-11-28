
import {html} from "lit"
import {component2 as element} from "@chasemoskal/magical/x/component.js"

import {styles} from "./style.css.js"
import {Bindings, Nub} from "../../types.js"
import {ButtonsView} from "./views/buttons.js"
import {WaitingForAssignment} from "./types.js"
import {renderKeyView} from "./utils/render-key-view.js"
import {stateForClosestContext} from "./utils/state-for-closest-context.js"
import {setupListenForBindingsChanges} from "./utils/setup-listen-for-bindings-changes.js"
import {setupListenToInputsAndActuateKeyBindReassignment} from "./utils/setup-listen-to-inputs-and-actuate-key-bind-reassignment.ts.js"

export const NubBindingsEditor = element<{}>({
		styles,
		shadow: true,
		properties: {},
	}).render(use => {

	const [context] =
		use.state(
			stateForClosestContext(use.element)
		)

	const [bindings, setBindings] =
		use.state<Bindings>(
			() => context.getBindings()
		)

	const [waitingForAssignment, setWaitingForAssignment, getWaitingForAssignment] =
		use.state<undefined | WaitingForAssignment>(undefined)

	use.setup(
		setupListenToInputsAndActuateKeyBindReassignment({
			context,
			getWaitingForAssignment,
			setWaitingForAssignment,
		})
	)

	use.setup(
		setupListenForBindingsChanges(context, setBindings)
	)

	return html`
		<div class=column>
			<h1>bindings editor</h1>

			<div class=row>
				${Object
					.entries(bindings["*️⃣"])
					.map(
						renderKeyView(
							waitingForAssignment,
							setWaitingForAssignment,
						)
					)}
			</div>

			${ButtonsView(context)}
		</div>
	`
})
