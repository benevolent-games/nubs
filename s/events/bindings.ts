
import {Bindings} from "../bindings/types.js"
import {xevent, Xevent} from "../framework/xevent.js"

export class NubBindingsEvent extends Xevent<{bindings: Bindings}> {
	static eventName = "nub_bindings"
	static target = xevent(NubBindingsEvent).target

	constructor(detail: {bindings: Bindings}) {
		super(NubBindingsEvent.eventName, detail)
	}
}
