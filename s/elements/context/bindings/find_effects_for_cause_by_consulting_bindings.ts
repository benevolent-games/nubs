
import {Bindings2} from "./types/bindings.js"
import {NubDetail} from "../../../events/types/detail.js"
import {ReadableSet} from "../../../tools/regulated-set/types/readable-set.js"
import {compareStringArrays} from "../../../tools/compare-string-arrays.js"

export function find_effects_for_cause_by_consulting_bindings({
		modes,
		bindings,
		keys_pressed,
		cause_detail,
	}: {
		bindings: Bindings2
		keys_pressed: Set<string>
		modes: ReadableSet<string>
		cause_detail: NubDetail.Any
	}) {

	const {kind} = cause_detail
	const cause = Array.from(keys_pressed)
	const matching_effect_names = new Set<string>()

	modes.forEach(mode => {
		const kindbinds = bindings.modes[mode] ?? {}
		const binds = kindbinds[kind] ?? {}

		for (const [effect, bindlist] of Object.entries(binds)) {
			for (const bind of bindlist) {
				if(compareStringArrays(bind, cause)) {
					matching_effect_names.add(effect)
				}
			}
		}
	})

	return matching_effect_names
}
