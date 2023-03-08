
import {obtool} from "@chasemoskal/magical"

import {clone} from "../../../tools/clone.js"
import {NubDetail} from "../../../events/types/detail.js"
import {EffectReports, Effects} from "../bindings/types/effects.js"

export function setup_effects_and_readable_proxy() {

	const writable = {
		key: {} as EffectReports<NubDetail.Key>,
		pointer: {} as EffectReports<NubDetail.Pointer>,
		stick: {} as EffectReports<NubDetail.Stick>,
	} satisfies Effects

	const readable = (
		obtool(writable)
			.map(reports => new Proxy({}, {

				get(t, key: string) {
					return clone(reports[key])
				},

				set(t, key: string, value: any) {
					throw new Error(`forbidden to write "${key}" to readable effects`)
				},

			}))
	) as typeof writable

	return {writable, readable}
}
