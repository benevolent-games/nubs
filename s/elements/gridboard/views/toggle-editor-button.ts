
import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"
import editSvg from "../../../framework/icons/akar/edit.svg.js"

export const ToggleEditorButtonView = view(use => (toggleEditor: () => void) => {
	return html`
		<div class=toggle-editor @pointerdown=${toggleEditor}>
			${editSvg}
		</div>
	`
})

ToggleEditorButtonView.shadow = false
