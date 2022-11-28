
import {Nub} from "../types.js"

export class NubActionEvent<xDetail extends Nub.Detail.Any = Nub.Detail.Any>
	extends CustomEvent<xDetail & {action: string}> {

	static eventName = "nub_action"

	constructor(detail: xDetail & {action: string}) {
		super(NubActionEvent.eventName, {
			detail,
			bubbles: true,
			composed: true,
			cancelable: true,
		})
	}
}
