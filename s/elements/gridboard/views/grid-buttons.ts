
import {html, SVGTemplateResult, TemplateResult} from "lit"
import {view} from "@chasemoskal/magical"

import {TriggerInput} from "../types.js"
import {Keylog} from "../starters/keylog.js"
import {KeyLayout} from "../layouts/key-layout.js"
import {prepGridboardEvents} from "../setups/prep-gridboard-events.js"

import mentionSvg from "../../../framework/icons/akar/mention.svg.js"
import circleChevronUpFillSvg from "../../../framework/icons/akar/circle-chevron-up-fill.svg.js"
import circleChevronDownFillSvg from "../../../framework/icons/akar/circle-chevron-down-fill.svg.js"
import circleChevronLeftFillSvg from "../../../framework/icons/akar/circle-chevron-left-fill.svg.js"
import circleChevronRightFillSvg from "../../../framework/icons/akar/circle-chevron-right-fill.svg.js"

export type Embellishment = {
	label: string
	icon?: TemplateResult | SVGTemplateResult | void
}

export type Embellishments = {
	[keycode: string]: Embellishment
}

const embellishments: Embellishments = {
	"KeyE": {
		label: "forth",
		icon: circleChevronUpFillSvg,
	},
	"KeyD": {
		label: "back",
		icon: circleChevronDownFillSvg,
	},
	"KeyS": {
		label: "left",
		icon: circleChevronLeftFillSvg,
	},
	"KeyF": {
		label: "right",
		icon: circleChevronRightFillSvg,
	},
} satisfies {[key: string]: Embellishment}

export const GridButtonsView = view({}, use => ({
		keylog,
		layout,
		triggerInput,
	}: {
		layout: KeyLayout
		keylog: Keylog
		triggerInput: TriggerInput
	}) => {

	const {pointerup, pointerdown} = prepGridboardEvents(triggerInput)

	function isKeyPressed(code: string) {
		return keylog[code]?.pressed ?? false
	}

	function renderButton([keycap, keycode]: string[]) {
		const embellishment = embellishments[keycode]
		const isEmbellished = !!embellishment
		return html`
			<button
				class=key
				data-keycap="${keycap}"
				data-keycode="${keycode}"
				?data-is-embellished=${isEmbellished}
				?data-is-pressed=${isKeyPressed(keycode)}
				@pointerup=${pointerup}
				@pointerdown=${pointerdown}>

				${embellishment && html`
					<span class=icon>
						${embellishment.icon}
					</span>
					<span class=label>
						${embellishment.label}
					</span>
				`}

				<span class=keycap>
					${keycap}
				</span>
			</button>
		`
	}

	function renderRow(row: string[][]) {
		return html`
			<div class=row>
				${row.map(renderButton)}
			</div>
		`
	}

	return html`
		${layout.map(renderRow)}
	`
})
