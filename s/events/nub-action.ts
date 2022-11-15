
import {Nub} from "../types.js"

export class NubAction<xDetail extends Nub.Detail.Any = Nub.Detail.Any>
	extends CustomEvent<xDetail> {

	constructor(detail: xDetail) {
		super("nub_action", {
			detail,
			bubbles: true,
			composed: true,
			cancelable: true,
		})
	}
}
