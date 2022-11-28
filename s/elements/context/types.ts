
import {Actions, Bindings} from "../../types.js"

export type NubContextProperties = NubContextInputs & NubContextOutputs

export interface NubContextInputs {

	/** used as localstorage key prefix, to differentiate contexts */
	name: string

	/** property to set the initial default bindings programmatically via javascript (takes precedence over default-bindings) */
	defaultBindingsJson: Bindings | undefined

	/** attribute to set the initial default bindings in text format via html */
	"default-bindings": string | undefined
}

export interface NubContextOutputs {

	/** getters, can be used to query latest action details */
	actions: Actions

	/** get current bindings */
	getBindings: () => Bindings

	/** save new bindings, and save to localstorage, and dispatch bindings event */
	updateBindings: (bindings: Bindings) => void
}
