
import {html} from "lit"
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import {styles} from "./style.css.js"
import {NubBindingsEvent} from "../../events/bindings.js"
import {Bindings} from "../context/bindings/types/bindings.js"
import {GuiEditorPanelView} from "./views/gui-editor-panel.js"
import {TextEditorPanelView} from "./views/text-editor-panel.js"
import {default_mode} from "../context/bindings/fallback_bindings.js"
import {setupContextGetter} from "../../framework/setup-context-getter.js"

@mixinCss(styles)
export class NubEditor extends MagicElement {

	#getContext = setupContextGetter(this)

	realize() {
		const {use} = this
		const context = this.#getContext()

		const [bindings, setBindings, getBindings] =
			use.state<Bindings>(() => context.bindings)

		const [editingApproach, setEditingApproach] =
			use.state<"gui" | "text">("gui")

		const availableModes = Object.keys(bindings)
		const [primaryMode = default_mode] = availableModes

		const [, setMode, getMode] =
			use.state(primaryMode)

		use.setup(() =>
			NubBindingsEvent
				.target(context)
				.listen(event => setBindings(event.detail.bindings))
		)

		const toggleApproach = () => {
			setEditingApproach(
				editingApproach === "gui"
					? "text"
					: "gui"
			)
		}

		return html`
			<div class=metabar>

				<button @click=${toggleApproach}>
					${editingApproach === "gui"
						? "switch to text editor"
						: "switch to gui editor"}
				</button>

				<button @click=${context.restoreBindingsToDefaults}>
					reset to defaults
				</button>

			</div>

			${editingApproach === "text"

				? TextEditorPanelView({
					bindings,
					onClickSave(draft) {
						context.bindings = draft
					},
				})

				: GuiEditorPanelView({
					availableModes,
					eventTarget: context,
					getMode,
					setMode,
					getBindings,
					setBindings,
				})}
		`
	}
}

