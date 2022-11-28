
import {Nub} from "../types.js"

export class NubInputEvent<xDetail extends Nub.Detail.Any = Nub.Detail.Any>
	extends CustomEvent<xDetail> {

	static eventName = "nub_input"

	constructor(detail: xDetail) {
		super(NubInputEvent.eventName, {
			detail,
			bubbles: true,
			composed: true,
			cancelable: true,
		})
	}
}
