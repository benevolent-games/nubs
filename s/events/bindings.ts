
import {MagicEvent} from "@chasemoskal/magical"
import {Bindings} from "../bindings/types.js"

export class NubBindingsEvent
	extends MagicEvent<{bindings: Bindings}>("nub_bindings") {}
