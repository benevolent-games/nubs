
import {Nub} from "../types.js"

export class NubInput<xDetail extends Nub.Detail.Any = Nub.Detail.Any>
	extends CustomEvent<xDetail> {

	static eventName = "nub_input"

	constructor(detail: xDetail) {
		super(NubInput.eventName, {
			detail,
			bubbles: true,
			composed: true,
			cancelable: true,
		})
	}
}
