
import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"

import {keys} from "../setups/utils/keys.js"
import {GridboardStarters} from "../types.js"
import {prepGridboardEvents} from "../setups/prep-gridboard-events.js"

export const ButtonsView = view(use => (starters: GridboardStarters) => {
	const events = prepGridboardEvents(starters)
	return html`
		${Object
			.keys(keys)
			.map((key: any) => html`
				<button
					@pointerdown=${events.pointerdown}
					@pointerup=${events.pointerup}
					data-key="${key}"
					itemid="${key}"
					class="key">
						${key}
				</button>
			`)}
	`
})

ButtonsView.shadow = false
