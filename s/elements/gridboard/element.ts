
import {html} from "lit"
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import {styles} from "./style.css.js"
import {property} from "lit/decorators.js"
import {EditorView} from "./views/editor.js"
import {getStarters} from "./parts/starters.js"
import {GridButtonsView} from "./views/grid-buttons.js"
import {DraggableContainerView} from "./views/draggable-container.js"
import {ToggleEditorButtonView} from "./views/toggle-editor-button.js"

@mixinCss(styles)
export class NubGridboard extends MagicElement {

	@property({type: String, reflect: true})
	name: string = "1"

	realize() {
		const {use} = this

		const starters = getStarters(this)
		const [isEditorOpen, setEditorOpen] = use.state(false)
		const toggleEditor = () => setEditorOpen(x => !x)

		return html`
			<div class=shell>
				${EditorView({isEditorOpen})}
				<div class=grid>
					${ToggleEditorButtonView(toggleEditor)}
					${DraggableContainerView(starters)}
					${GridButtonsView(starters)}
				</div>
			</div>
		`
	}
}
