
import {Nub} from "../types.js"
import {xevent, Xevent} from "../framework/xevent.js"

export class NubInputEvent<D extends Nub.Detail.Any = Nub.Detail.Any>
	extends Xevent<D> {

	static eventName = "nub_input"
	static target = xevent(NubInputEvent).target

	constructor(detail: D) {
		super(NubInputEvent.eventName, detail)
	}
}
