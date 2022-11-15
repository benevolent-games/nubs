
import {Nub} from "../types.js"

export class NubInput<xDetail extends Nub.Detail.Any = Nub.Detail.Any>
	extends CustomEvent<xDetail> {

	constructor(detail: xDetail) {
		super("nub_input", {
			detail,
			bubbles: true,
			composed: true,
			cancelable: true,
		})
	}
}
