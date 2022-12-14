
import {Nub} from "../types.js"
import {MagicEventBase, ev} from "@chasemoskal/magical"

type Any = Nub.Detail.Any

export class NubInputEvent
		<D extends Any = Any>
		extends MagicEventBase<D> {

	static readonly type = "nub_input"
	static readonly target = ev(this).target
}
