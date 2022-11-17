
import {Nub} from "../types.js"

export class NubAction<xDetail extends Nub.Detail.Any = Nub.Detail.Any>
	extends CustomEvent<xDetail & {action: string}> {

	static eventName = "nub_action"

	constructor(detail: xDetail & {action: string}) {
		super(NubAction.eventName, {
			detail,
			bubbles: true,
			composed: true,
			cancelable: true,
		})
	}
}
