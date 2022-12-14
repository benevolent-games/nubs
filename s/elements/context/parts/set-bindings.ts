
import {LitElement} from "lit"
import {NubBindingsEvent} from "../../../events/bindings.js"
import {Bindings, BindingsStore} from "../../../bindings/types.js"

export function setBindings({
		store,
		element,
		newBindings,
		oldBindings,
	}: {
		newBindings: Bindings
		oldBindings: Bindings
		store: BindingsStore | undefined
		element: LitElement
	}) {

	if (store)
		store.save(newBindings)
	else
		console.warn("bindings set before store ready")

	element.requestUpdate("bindings", oldBindings)

	NubBindingsEvent
		.target(element)
		.dispatch({bindings: newBindings})
}
