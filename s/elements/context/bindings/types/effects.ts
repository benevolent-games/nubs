
import {EffectReports} from "./effect-reports.js"
import {NubDetail} from "../../../../events/types/detail.js"

export type Effects = {
	[P in NubDetail.Kind]: EffectReports
}
