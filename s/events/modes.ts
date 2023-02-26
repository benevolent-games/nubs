
import {MagicEvent} from "@chasemoskal/magical"
import {ReadableSet} from "../tools/regulated-set/types/readable-set.js"

export class NubModesEvent
	extends MagicEvent<{modes: ReadableSet<string>}>("nub_modes_change") {}
