
import {obtool} from "@chasemoskal/magical"
import {Bindings} from "./types/bindings.js"
import {BindingsSchema} from "./types/bindings-schema.js"

export function extract_bindings(decorated: BindingsSchema): Bindings {
	return obtool(decorated).map(
		mode => obtool(mode).map(
			kind => obtool(kind).map(
				bind => bind.causes
			)
		)
	)
}
