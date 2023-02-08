
import {html} from "lit"
import {view} from "@chasemoskal/magical"

import {TriggerInput} from "../types.js"
import {Keylog} from "../starters/keylog.js"
import {gridkeys} from "../parts/gridkeys.js"
import {prepGridboardEvents} from "../setups/prep-gridboard-events.js"

export const GridButtonsView = view({}, use => ({
		keylog,
		triggerInput,
	}: {
		keylog: Keylog
		triggerInput: TriggerInput
	}) => {

	const events = prepGridboardEvents(triggerInput)

	function isKeyPressed(code: string) {
		return keylog[code]?.pressed ?? false
	}

	function renderButton([keycap, keycode]: string[]) {
		return html`
			<button
				class=key
				data-keycap="${keycap}"
				data-keycode="${keycode}"
				@pointerup=${events.pointerup}
				@pointerdown=${events.pointerdown}
				?data-is-pressed=${isKeyPressed(keycode)}
				>
				${keycap}
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
		${gridkeys.map(renderRow)}
	`
})
