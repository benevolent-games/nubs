
import {html} from "lit"
import {view} from "@chasemoskal/magical"

import {TriggerInput} from "../types.js"
import {gridkeys} from "../parts/gridkeys.js"
import {prepGridboardEvents} from "../setups/prep-gridboard-events.js"

export const GridButtonsView = view({}, use => ({triggerInput}: {
		triggerInput: TriggerInput
	}) => {

	const events = prepGridboardEvents(triggerInput)

	return html`
		${gridkeys
			.flat()
			.map(([keycap, keycode]) => html`
				<button
					class=key
					data-keycap="${keycap}"
					data-keycode="${keycode}"
					@pointerdown=${events.pointerdown}
					@pointerup=${events.pointerup}>
						${keycap}
				</button>
			`)}
	`
})
