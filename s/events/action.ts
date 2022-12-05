
import {Nub} from "../types.js"
import {Xevent, xevent} from "../framework/xevent.js"

export class NubActionEvent<D extends Nub.Detail.Any = Nub.Detail.Any>
	extends Xevent<D & {action: string}> {

	static eventName = "nub_action"
	static target = xevent(NubActionEvent).target

	constructor(detail: D & {action: string}) {
		super(NubActionEvent.eventName, detail)
	}
}
