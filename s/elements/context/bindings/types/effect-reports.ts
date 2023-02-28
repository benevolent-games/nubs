
import {NubDetail} from "../../../../events/types/detail.js"

export type EffectReports<D extends NubDetail.Any = NubDetail.Any> = {
	[effect: string]: NubDetail.Effect<D>
}
