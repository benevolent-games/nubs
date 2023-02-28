
import {NubDetail} from "../../../../events/types/detail.js"

export type EffectLookups = {
	[P in NubDetail.Kind]: (effect: string) => NubDetail.Effect<NubDetail.Any>
}
