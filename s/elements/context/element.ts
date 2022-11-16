
import {html} from "lit"
import {component2 as element} from "@chasemoskal/magical/x/component.js"

import {styles} from "./style.css.js"
import {NubInput} from "../../main.js"
import {Bindings, Nub} from "../../types.js"
import {defaultBindings} from "./parts/default-bindings.js"
import {dispatchNubEvent} from "../../framework/dispatch.js"

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

			case Nub.Type.Key:
				return dispatchNubEvent()
					.atTarget(use.element)
					.action()
					.key("lol", input.detail)
					.fire()

			case Nub.Type.Vector2:
				return dispatchNubEvent()
					.atTarget(use.element)
					.action()
					.vector2("lel", input.detail)
					.fire()
		}
	}

	return html`
		<slot @nub_input=${handleInput}></slot>
	`
})
