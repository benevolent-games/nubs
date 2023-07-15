
import {obtool} from "@chasemoskal/magical"

import {Bindings1, Bindings2} from "../types/bindings.js"
import {BindingsConverter} from "../types/bindings-converter.js"

export const converter_1: BindingsConverter<Bindings1, Bindings2> = (b1) => ({
	version: 2,
		modes: obtool(b1).map(
			mode => obtool(mode).map(
				kind => obtool(kind).map(
					bind => [bind]
				)
			)
		)
})
