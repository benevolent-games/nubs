
import {html, SVGTemplateResult, TemplateResult} from "lit"
import {view} from "@chasemoskal/magical"

import {TriggerInput} from "../types.js"
import {Keylog} from "../starters/keylog.js"
import {KeyLayout} from "../layouts/key-layout.js"
import {prepGridboardEvents} from "../setups/prep-gridboard-events.js"

import gearSvg from "../../../framework/icons/akar/gear.svg.js"
import mentionSvg from "../../../framework/icons/akar/mention.svg.js"
import arrowUpThickSvg from "../../../framework/icons/akar/arrow-up-thick.svg.js"
import arrowDownThickSvg from "../../../framework/icons/akar/arrow-down-thick.svg.js"
import arrowLeftThickSvg from "../../../framework/icons/akar/arrow-left-thick.svg.js"
import arrowRightThickSvg from "../../../framework/icons/akar/arrow-right-thick.svg.js"
import circleChevronUpFillSvg from "../../../framework/icons/akar/circle-chevron-up-fill.svg.js"
import circleChevronDownFillSvg from "../../../framework/icons/akar/circle-chevron-down-fill.svg.js"
import circleChevronLeftFillSvg from "../../../framework/icons/akar/circle-chevron-left-fill.svg.js"
import circleChevronRightFillSvg from "../../../framework/icons/akar/circle-chevron-right-fill.svg.js"
import crossSvg from "../../../framework/icons/akar/cross.svg.js"
import peopleGroupSvg from "../../../framework/icons/akar/people-group.svg.js"
import personSvg from "../../../framework/icons/akar/person.svg.js"
import chatDotsSvg from "../../../framework/icons/akar/chat-dots.svg.js"
import blockSvg from "../../../framework/icons/akar/block.svg.js"
import dragHorizontalFillSvg from "../../../framework/icons/akar/drag-horizontal-fill.svg.js"
import gridSvg from "../../../framework/icons/akar/grid.svg.js"
import bugSvg from "../../../framework/icons/akar/bug.svg.js"
import wifiSvg from "../../../framework/icons/akar/wifi.svg.js"

export type Embellishment = {
	label: string
	icon?: TemplateResult | SVGTemplateResult | void
}

export type Embellishments = {
	[keycode: string]: Embellishment
}

const embellishments: Embellishments = {
	KeyQ: {label: "back", icon: blockSvg},
	KeyW: {label: "settings", icon: gearSvg},
	KeyE: {label: "profiler", icon: bugSvg},
	KeyR: {label: "social", icon: peopleGroupSvg},
	KeyT: {label: "connection", icon: wifiSvg},

	// KeyQ: {label: "menu", icon: gridSvg},
	// KeyE: {label: "forth", icon: arrowUpThickSvg},
	// KeyD: {label: "back", icon: arrowDownThickSvg},
	// KeyS: {label: "left", icon: arrowLeftThickSvg},
	// KeyF: {label: "right", icon: arrowRightThickSvg},
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
