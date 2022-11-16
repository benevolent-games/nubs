
import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"

export const EditorView = view(use => ({}: {}) => {
	return html`
		<div class=editor>
			<p>coming soon</p>
		</div>
	`
	// return html`
	// 	<div class="editor">
	// 		<div class="actions">
	// 			${Object.values(keys).slice(0, 10).map(({key, actionName}: KeyData, i: number) => html`
	// 			<span class="action">
	// 				${actionName ? actionName : ''}
	// 			</span>`)}
	// 		</div>
	// 		<div class="edit-keys">
	// 			${Object.values(keys).slice(0, 10).map(({key}: KeyData) => html`
	// 			<span class="edit-key">${key}</span>
	// 			`)}
	// 		</div>
	// 	</div>
	// `
})

EditorView.shadow = false
