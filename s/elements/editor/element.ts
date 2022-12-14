
import {html} from "lit"
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import {styles} from "./style.css.js"
import {Bindings} from "../../bindings/types.js"
import {NubBindingsEvent} from "../../events/bindings.js"
import {EasyEditorPanelView} from "./views/easy-editor-panel.js"
import {TextEditorPanelView} from "./views/text-editor-panel.js"
import {prepareAssignKeybind} from "./utils/prepare-assign-keybind.js"
import {stateForClosestContext} from "./utils/state-for-closest-context.js"

@mixinCss(styles)
export class NubEditor extends MagicElement {
	realize() {
		const {use} = this

		const [context]
			= use.state(stateForClosestContext(use.element))

		const [showTextEditor, setShowTextEditor]
			= use.state(false)

		const [bindings, setBindings]
			= use.state<Bindings>(() => context.bindings)

		use.setup(() =>
			NubBindingsEvent
				.target(context)
				.listen(event => setBindings(event.detail.bindings))
		)

		return html`
			<div class=metabar>
				<button @click=${() => setShowTextEditor(x => !x)}>
					${showTextEditor ? "text mode" : "easy mode"}
				</button>
			</div>

			${showTextEditor
				? TextEditorPanelView({
					bindings,
					onClickSave(draft) {
						context.bindings = draft
					},
				})
				: EasyEditorPanelView({
					bindings,
					eventTarget: context,
					onResetDefaults: context.restoreBindingsToDefaults,
					onKeybindAssignment: prepareAssignKeybind(context),
				})}
		`
	}
}
