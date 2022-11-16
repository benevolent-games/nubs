
import {html} from "lit"
import {component2 as element} from "@chasemoskal/magical/x/component.js"

import {styles} from "./style.css.js"
import {NubInput} from "../../main.js"
import {Bindings, Nub} from "../../types.js"
import {defaultBindings} from "./parts/default-bindings.js"
import {dispatchNubEvent} from "../../framework/dispatch.js"
import {findActionsForKeyEvent} from "./parts/find-actions-for-key-event.js"
import {findActionsForVector2Event} from "./parts/find-actions-for-vector2-event.js"

export const NubContext = element<{
		bindingsJson: Bindings | void
	}>({
		styles,
		shadow: true,
		properties: {
			bindingsJson: {type: Object, reflect: false},
		},
	}).render(use => {

	const bindings: Bindings = use.element.bindingsJson ?? defaultBindings

	function handleInput(input: NubInput) {
		switch (input.detail.type) {

			case Nub.Type.Key: {
				for (const action of findActionsForKeyEvent(
						input.detail.code,
						input.detail.channels,
						bindings,
					))
					dispatchNubEvent()
						.atTarget(use.element)
						.action(action)
						.key(input.detail)
						.fire()
			} break

			case Nub.Type.Vector2: {
				for (const action of findActionsForVector2Event(
						input.detail.channels,
						bindings,
					))
					dispatchNubEvent()
						.atTarget(use.element)
						.action(action)
						.vector2(input.detail)
						.fire()
			} break
		}
	}

	return html`
		<slot @nub_input=${handleInput}></slot>
	`
})
