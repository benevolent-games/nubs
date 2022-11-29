
import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"

import {Bindings} from "../../../types.js"
import {defaultBindingsText} from "../../context/parts/default-bindings.js"

export const TextEditorPanelView = view(use => ({
		bindings,
	}: {
		bindings: Bindings
	}) => {

	return html`
		<div data-panel=text-editor>
			<textarea>${bindingsToText(bindings)}</textarea>
		</div>
	`
})

export function bindingsToText(bindings: Bindings) {
	return defaultBindingsText()
}
