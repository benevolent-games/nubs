
import {clone} from "../../../tools/clone.js"
import {NubDetail} from "../../../events/types/detail.js"
import {EffectLookups, EffectReports, Effects} from "../bindings/types/effects.js"

export function setup_effects_and_lookups() {
	const writable = {
		key: {} as EffectReports<NubDetail.Key>,
		pointer: {} as EffectReports<NubDetail.Pointer>,
		stick: {} as EffectReports<NubDetail.Stick>,
	} satisfies Effects

	const lookup = <D extends NubDetail.Any>(reports: EffectReports<D>) => (
		(effect: string) => clone(reports[effect])
	)

	const lookups = Object.freeze({
		key: lookup<NubDetail.Key>(writable.key),
		pointer: lookup<NubDetail.Pointer>(writable.pointer),
		stick: lookup<NubDetail.Stick>(writable.stick),
	} satisfies EffectLookups)

	return {writable, lookups}
}
