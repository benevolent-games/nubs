
import {NubDetail} from "./types/detail.js"
import {ev, MagicEventBase} from "@chasemoskal/magical"

type Any = NubDetail.Any

export class NubCauseEvent<D extends Any = Any>
	extends MagicEventBase<D> {

	static readonly type = "nub_cause"
	static readonly target = ev(this).target
}
