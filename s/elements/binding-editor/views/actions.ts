import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"

export const ActionsView = view(use => (value: [string, string[][]]) => {
	return html`<div class="action">${value[0]}</div>`
})
