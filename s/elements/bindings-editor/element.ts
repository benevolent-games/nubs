
import {html} from "lit"
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import {styles} from "./style.css.js"
import {Bindings} from "../../bindings/types.js"
import {EasyEditorPanelView} from "./views/easy-editor-panel.js"
import {TextEditorPanelView} from "./views/text-editor-panel.js"
import {prepareAssignKeybind} from "./utils/prepare-assign-keybind.js"
import {stateForClosestContext} from "./utils/state-for-closest-context.js"
import {setupListenForBindingsChanges} from "./utils/setup-listen-for-bindings-changes.js"

@mixinCss(styles)
export class NubEditor extends MagicElement {
	realize() {
		const {use} = this

		const [context]
			= use.state(stateForClosestContext(use.element))

		const [bindings, setBindings]
			= use.state<Bindings>(() => context.getBindings())

		const [showTextEditor, setShowTextEditor]
			= use.state(false)

		use.setup(
			setupListenForBindingsChanges(context, setBindings)
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
						context.updateBindings(draft)
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
