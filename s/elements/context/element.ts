
import {html} from "lit"
import {component2 as element} from "@chasemoskal/magical/x/component.js"

import {styles} from "./style.css.js"
import {Actions, Bindings, Nub} from "../../types.js"
import {defaultBindings} from "./parts/default-bindings.js"
import {stateForActions as stateForActions} from "./parts/state-for-actions.js"
import {translateInputEventsToActionEvents} from "./parts/translate-input-events-to-action-events.js"
import {listenForStorageEventsToUpdateBindings, loadLocalStorageBindings} from "../bindings-editor/utils/loadBindings.js"

export const NubContext = element<{
		actions: Actions
		bindingsJson: Bindings | undefined
	}>({
		styles,
		shadow: true,
		properties: {
			actions: {attribute: false},
			bindingsJson: {attribute: false},
		},
	}).render(use => {

	const [actions] = use.state(stateForActions)
	const [bindings, setBindings] = use.state<Bindings>(() => loadLocalStorageBindings() ?? use.element.bindingsJson ?? defaultBindings)

	use.setup(() => listenForStorageEventsToUpdateBindings(window, setBindings))

	const handleInput = translateInputEventsToActionEvents({
		actions,
		bindings,
		element: use.element,
	})

	return html`<slot @nub_input=${handleInput}></slot>`
})
