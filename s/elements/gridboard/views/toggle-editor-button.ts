
import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"

export const ToggleEditorButtonView = view(use => (toggleEditor: () => void) => {
	return html`
		<div class=toggle-editor @pointerdown=${toggleEditor}>
			<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ai ai-Edit"><path d="M16.474 5.408l2.118 2.117m-.756-3.982L12.109 9.27a2.118 2.118 0 0 0-.58 1.082L11 13l2.648-.53c.41-.082.786-.283 1.082-.579l5.727-5.727a1.853 1.853 0 1 0-2.621-2.621z"/><path d="M19 15v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3"/></svg>
		</div>
	`
})

ToggleEditorButtonView.shadow = false
