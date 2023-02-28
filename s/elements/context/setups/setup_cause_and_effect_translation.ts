
import {Effects} from "../bindings/types/effects.js"
import {Bindings} from "../bindings/types/bindings.js"
import {NubCauseEvent} from "../../../events/cause.js"
import {NubDetail} from "../../../events/types/detail.js"
import {ReadableSet} from "../../../tools/regulated-set/types/readable-set.js"
import find_effects_for_cause_by_consulting_bindings from "../bindings/find_effects_for_cause_by_consulting_bindings.js"

export default function({
		modes,
		effects,
		bindings,
		onEffect,
	}: {
		modes: ReadableSet<string>
		effects: Effects
		bindings: Bindings
		onEffect: (detail: NubDetail.Effect) => void
	}) {

	return ({detail: cause_detail}: NubCauseEvent) => {

		const matching_effect_names = (
			find_effects_for_cause_by_consulting_bindings({
				modes,
				bindings,
				cause_detail,
			})
		)

		for (const effect of matching_effect_names) {
			const effect_detail = {...cause_detail, effect}
			effects[cause_detail.kind][effect] = effect_detail
			onEffect(effect_detail)
		}
	}
}
