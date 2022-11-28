
import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"

import {NubContextElement} from "../../context/element.js"

export const ButtonsView = view(use => (context: NubContextElement) => {
	return html`
		<div class=buttons>
			<button
				@click=${context.restoreBindingsToDefaults}>
				Restore to default
			</button>
		</div>
	`
})
