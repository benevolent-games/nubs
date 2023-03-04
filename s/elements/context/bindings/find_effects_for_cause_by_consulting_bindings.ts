
import {Bindings} from "./types/bindings.js"
import {NubDetail} from "../../../events/types/detail.js"
import {ReadableSet} from "../../../tools/regulated-set/types/readable-set.js"

export function find_effects_for_cause_by_consulting_bindings({
		modes,
		bindings,
		cause_detail,
	}: {
		bindings: Bindings
		modes: ReadableSet<string>
		cause_detail: NubDetail.Any
	}) {

	const {kind, cause} = cause_detail
	const matching_effect_names = new Set<string>()

	modes.forEach(mode => {
		const kindbinds = bindings[mode] ?? {}
		const binds = kindbinds[kind] ?? {}

		for (const [effect, bindlist] of Object.entries(binds)) {
			if (bindlist.includes(cause)) {
				matching_effect_names.add(effect)
			}
		}
	})

	return matching_effect_names
}
