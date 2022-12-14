
import {html} from "lit"
import {view} from "@chasemoskal/magical"

export const EditorView = view({}, use => ({isEditorOpen}: {
		isEditorOpen: boolean
	}) => {

	return html`
		<div class=editor ?data-is-open=${isEditorOpen}>
			<p>coming soon!</p>
		</div>
	`
})
