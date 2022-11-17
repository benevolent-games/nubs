
import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"

export const EditorView = view(use => ({isEditorOpen}: {
		isEditorOpen: boolean
	}) => {
	return html`
		<div class=editor ?data-is-open=${isEditorOpen}>
			<p>coming soon!</p>
		</div>
	`
})

EditorView.shadow = false
