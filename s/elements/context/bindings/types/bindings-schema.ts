
import {SVGTemplateResult, TemplateResult} from "lit"

export type BindingsSchema = {
	[mode: string]: {
		[kind: string]: {
			[effect: string]: {
				causes: (string | string[])[]
				label?: string
				icon?: SVGTemplateResult | TemplateResult
			}
		}
	}
}
