
import {html} from "lit"
import {component2 as element} from "@chasemoskal/magical/x/component.js"

import {styles} from "./style.css.js"
import {Bindings} from "../../types.js"
import {NubContextProperties} from "./types.js"
import {defaultBindings} from "./parts/default-bindings.js"
import {stateForBindingsStore} from "./parts/state-for-bindings-store.js"
import {stateForActions as stateForActions} from "./parts/state-for-actions.js"
import {translateInputEventsToActionEvents} from "./parts/translate-input-events-to-action-events.js"
import {setupUpdateBindingsFunction as setupElementFunctions} from "./parts/setup-update-bindings-function.js"

export const NubContext = element<NubContextProperties>({
		styles,
		shadow: true,
		properties: {
			name: {type: String, reflect: true},
			defaultBindingsJson: {attribute: false},
			"default-bindings": {type: String},

			actions: {attribute: false},
			getBindings: {attribute: false},
			updateBindings: {attribute: false},
		},
	}).render(use => {

	const [actions] = use.state(stateForActions)

	const [{save, load}] = use.state(
		stateForBindingsStore(localStorage, use.element.name)
	)

	const [bindings, setBindings, getBindings] = use.state<Bindings>(
		element => load()
			?? element.defaultBindingsJson
			?? defaultBindings
	)

	use.setup(
		setupElementFunctions({save, getBindings, setBindings})
	)

	const handleInput = translateInputEventsToActionEvents({
		actions,
		bindings,
		element: use.element,
	})

	return html`<slot @nub_input=${handleInput}></slot>`
})
