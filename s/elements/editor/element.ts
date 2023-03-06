
import {html} from "lit"
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import {styles} from "./style.css.js"
import {ButtonsView} from "./views/buttons.js"
import {MetabarView} from "./views/metabar.js"
import {NubBindingsEvent} from "../../events/bindings.js"
import {Bindings} from "../context/bindings/types/bindings.js"
import {GuiEditorPanelView} from "./views/gui-editor-panel.js"
import {TextEditorPanelView} from "./views/text-editor-panel.js"
import {default_mode} from "../context/bindings/fallback_bindings_schema.js"
import {setupContextGetter} from "../../framework/helpers/setup-context-getter.js"

@mixinCss(styles)
export class NubEditor extends MagicElement {

	#getContext = setupContextGetter(this)

	realize() {
		const {use} = this
		const context = this.#getContext()

		const [bindingsDraft, setBindingsDraft, getBindingsDraft] =
			use.state<Bindings>(() => context.bindings)

		const [showSaveButton, setShowSaveButton] =
			use.state(false)

		const [editingApproach, setEditingApproach] =
			use.state<"gui" | "text">("gui")

		const availableModes = Object.keys(bindingsDraft)
		const [primaryMode = default_mode] = availableModes

		const [, setMode, getMode] =
			use.state(primaryMode)

		use.setup(() =>
			NubBindingsEvent
				.target(context)
				.listen(event => {
					setBindingsDraft(event.detail.bindings)
					setShowSaveButton(false)
				})
		)

		function changeBindingsDraftAndShowSaveButton(b: Bindings) {
			setBindingsDraft(b)
			setShowSaveButton(true)
		}

		return html`
			${MetabarView(
				editingApproach,
				function toggleApproach() {
					setEditingApproach(
						editingApproach === "gui"
							? "text"
							: "gui"
					)
				},
				function resetDefault() {
					context.reset_bindings_to_defaults()
				},
			)}

			${editingApproach === "text"

				? TextEditorPanelView({
					bindingsDraft,
					setBindingsDraft: changeBindingsDraftAndShowSaveButton,
				})

				: GuiEditorPanelView({
					bindingsDraft,
					setBindingsDraft: changeBindingsDraftAndShowSaveButton,
					getBindingsDraft,

					availableModes,
					getMode,
					setMode,

					listenForCauseEventsOn: context,
				})}

			${ButtonsView(
				showSaveButton,
				function onSaveClick() {
					context.bindings = getBindingsDraft()
				},
			)}
		`
	}
}
