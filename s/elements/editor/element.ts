
import {html} from "lit"
import {property} from "lit/decorators.js"
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import {styles} from "./style.css.js"
import {NubBindingsEvent} from "../../events/bindings.js"
import {Bindings} from "../context/bindings/types/bindings.js"
import {TextEditorPanelView} from "./views/text-editor-panel.js"
import {default_mode} from "../context/bindings/fallback_bindings.js"
import {parse_modes_string} from "../context/utils/parse_modes_string.js"
import {setupContextGetter} from "../../framework/setup-context-getter.js"
import {GuiEditorPanelView} from "./views/gui-editor-panel.js"

@mixinCss(styles)
export class NubEditor extends MagicElement {

	#getContext = setupContextGetter(this)

	@property({type: String, reflect: true})
	modes: string = default_mode

	realize() {
		const {use} = this
		const context = this.#getContext()
		const availableModes = parse_modes_string(this.modes)
		const [primaryMode = default_mode] = availableModes

		const [editingApproach, setEditingApproach] =
			use.state<"gui" | "text">("gui")

		const [currentMode, setCurrentMode] =
			use.state(primaryMode)

		const [bindings, setBindings] =
			use.state<Bindings>(() => context.bindings)

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
					${editingApproach}
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
					bindings,
					currentMode,
					availableModes,
					eventTarget: context,
					setCurrentMode,
					onResetDefaults: context.restoreBindingsToDefaults,
					onKeybindAssignment: () => {}, //prepareAssignKeybind(context),
				})}

		`
	}
}

