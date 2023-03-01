
import {NubDetail} from "../../../../events/types/detail.js"

export type Effects = {
	[P in NubDetail.Kind]: EffectReports
}

export type EffectLookups = {
	[P in NubDetail.Kind]: (effect: string) => NubDetail.Effect<NubDetail.Any>
}

export type EffectReports<D extends NubDetail.Any = NubDetail.Any> = {
	[effect: string]: NubDetail.Effect<D>
}
