
import {Bindings} from "../types.js"

export class NubBindingsEvent extends CustomEvent<{bindings: Bindings}> {
	static eventName = "nub_bindings"

	constructor(detail: {bindings: Bindings}) {
		super(NubBindingsEvent.eventName, {
			detail,
			bubbles: true,
			composed: true,
			cancelable: true,
		})
	}
}
