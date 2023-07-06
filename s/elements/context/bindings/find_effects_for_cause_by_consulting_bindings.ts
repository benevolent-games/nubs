
import {Bindings} from "./types/bindings.js"
import {NubDetail} from "../../../events/types/detail.js"
import {compareStringArrays} from "../../../tools/compare-string-arrays.js"
import {ReadableSet} from "../../../tools/regulated-set/types/readable-set.js"

export function find_effects_for_cause_by_consulting_bindings({
		modes,
		bindings,
		keys_pressed,
		cause_detail,
	}: {
		bindings: Bindings
		keys_pressed: Set<string>
		modes: ReadableSet<string>
		cause_detail: NubDetail.Any
	}) {

	const {kind, cause} = cause_detail
	const matching_effect_names = new Set<string>()
	const multiple_causes = Array.from(keys_pressed)

	modes.forEach(mode => {
		const kindbinds = bindings[mode] ?? {}
		const binds = kindbinds[kind] ?? {}

		for (const [effect, bindlist] of Object.entries(binds)) {
			for (const bind of bindlist) {
				if (typeof bind === "string") {
					if (bind === cause)
						matching_effect_names.add(effect)
				}
				else {
					if (multiple_causes.length > 1) {
						if (compareStringArrays(bind, multiple_causes)) {
							matching_effect_names.add(effect)
						}
					}
				}
			}
		}


	})

	return matching_effect_names
}
