
import {Effects} from "../bindings/types/effects.js"
import {Bindings} from "../bindings/types/bindings.js"
import {NubCauseEvent} from "../../../events/cause.js"
import {NubDetail} from "../../../events/types/detail.js"
import {ReadableSet} from "../../../tools/regulated-set/types/readable-set.js"
import {find_effects_for_cause_by_consulting_bindings} from "../bindings/find_effects_for_cause_by_consulting_bindings.js"

export const setup_cause_and_effect_translation = ({
		modes,
		effects,
		dispatch_effect,
		get_current_bindings,
	}: {
		effects: Effects
		modes: ReadableSet<string>
		get_current_bindings: () => Bindings
		dispatch_effect: (detail: NubDetail.Effect) => void
	}) => (

	({detail: cause_detail}: NubCauseEvent) => {

		const matching_effect_names = (
			find_effects_for_cause_by_consulting_bindings({
				modes,
				cause_detail,
				bindings: get_current_bindings(),
			})
		)

		for (const effect of matching_effect_names) {
			const effect_detail = {...cause_detail, effect}
			effects[cause_detail.kind][effect] = effect_detail
			dispatch_effect(effect_detail)
		}
	}
)
