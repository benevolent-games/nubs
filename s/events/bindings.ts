
import {MagicEvent} from "@chasemoskal/magical"
import {Bindings} from "../elements/context/bindings/types/bindings.js"

export class NubBindingsEvent
	extends MagicEvent<{bindings: Bindings}>("nub_bindings_change") {}
