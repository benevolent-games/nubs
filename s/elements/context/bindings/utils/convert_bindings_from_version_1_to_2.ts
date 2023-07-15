
import {obtool} from "@chasemoskal/magical"
import {Bindings1, Bindings2} from "../types/bindings.js"

export function convert_bindings_from_version_1_to_2(
		bindings: Bindings1
	): Bindings2 {

	return {
		version: 2,
		modes: obtool(bindings).map(
			mode => obtool(mode).map(
				kind => obtool(kind).map(
					bind => [bind]
				)
			)
		)
	}
}
