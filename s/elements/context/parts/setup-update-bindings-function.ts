
import {LitElement} from "lit"
import {Bindings} from "../../../types.js"
import {NubContextProperties} from "../types.js"
import {NubBindingsEvent} from "../../../events/bindings.js"

export function setupUpdateBindingsFunction({
		save,
		getBindings,
		setBindings,
	}: {
		save: (bindings: Bindings) => void
		getBindings: () => Bindings
		setBindings: (bindings: Bindings) => void
	}) {

	return (element: LitElement & NubContextProperties) => {

		element.getBindings = getBindings

		element.updateBindings = (bindings: Bindings) => {
			save(bindings)
			setBindings(bindings)
			element.dispatchEvent(new NubBindingsEvent({bindings}))
		}

		element.updateBindings(getBindings())
	}
}
