
import {MagicEvent} from "@chasemoskal/magical"
import {Bindings2} from "../elements/context/bindings/types/bindings.js"

export class NubBindingsEvent
	extends MagicEvent<{bindings: Bindings2}>("nub_bindings_change") {}
