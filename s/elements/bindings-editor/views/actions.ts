
import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"

export const ActionsView = view(use => (
		[action, keycodes]: [string, string[]]
	) => {

	return html`<div class=action>${action}</div>`
})
