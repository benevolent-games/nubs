
import {clone} from "../../../tools/clone.js"
import {Effects} from "../bindings/types/effects.js"
import {NubDetail} from "../../../events/types/detail.js"
import {EffectLookups} from "../bindings/types/effect-lookups.js"
import {EffectReports} from "../bindings/types/effect-reports.js"

export default function() {
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
