
import {html} from "lit"
import {component2 as element} from "@chasemoskal/magical/x/component.js"

import {styles} from "./style.css.js"
import {EditorView} from "./views/editor.js"
import {getStarters} from "./parts/starters.js"
import {GridButtonsView} from "./views/grid-buttons.js"
import {DraggableContainerView} from "./views/draggable-container.js"
import {ToggleEditorButtonView} from "./views/toggle-editor-button.js"

export const NubGridboard = element<{
		channels: string
	}>({
		styles,
		shadow: true,
		properties: {
			channels: {type: String, reflect: true},
		},
	}).render(use => {

	const starters = getStarters(use.element)
	const [isEditorOpen, setEditorOpen] = use.state(false)
	const toggleEditor = () => setEditorOpen(x => !x)

	return html`
		<div class=flex-box>
			${EditorView({isEditorOpen})}
			<div class="grid-box">
				${ToggleEditorButtonView(toggleEditor)}
				${DraggableContainerView(starters)}
				${GridButtonsView(starters)}
			</div>
		</div>
	`
})
