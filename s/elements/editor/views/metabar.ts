
import {html} from "lit"
import {view} from "@chasemoskal/magical"

export const MetabarView = view({}, use => (
		editingApproach: string,
		toggleApproach: () => void,
		restoreBindingsToDefaults: () => void,
	) => {

	return html`
		<div class=metabar>

			<button @click=${toggleApproach}>
				${editingApproach === "gui"
					? "switch to text editor"
					: "switch to gui editor"}
			</button>

			<button @click=${restoreBindingsToDefaults}>
				reset to defaults
			</button>

		</div>
	`
})
