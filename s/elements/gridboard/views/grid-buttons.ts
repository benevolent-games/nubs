
import {html} from "lit"
import {view} from "@chasemoskal/magical"

import {gridkeys} from "../parts/gridkeys.js"
import {GridboardStarters} from "../types.js"
import {prepGridboardEvents} from "../setups/prep-gridboard-events.js"

export const GridButtonsView = view({}, use => (
		starters: GridboardStarters
	) => {

	const events = prepGridboardEvents(starters)

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
