
import {html} from "lit"
import {component2 as element} from "@chasemoskal/magical/x/component.js"

import {Nub} from "../../types.js"
import {styles} from "./style.css.js"
import {GridboardStarters} from "./types.js"
import {EditorView} from "./views/editor.js"
import {ButtonsView} from "./views/buttons.js"
import {dispatchNubEvent} from "../../framework/dispatch.js"
import {setupWindowEvents} from "./setups/setup-window-events.js"
import {ToggleEditorButtonView} from "./views/toggle-editor-button.js"
import {DraggableContainerView} from "./views/draggable-container.js"

export const NubGridboard = element<{
		channels: string
	}>({
		styles,
		shadow: true,
		properties: {
			channels: {type: String, reflect: true},
		},
	}).render(use => {

	const starters: GridboardStarters = {
		query: () => ({
			element: use.element,
			draggableItem: use.element.shadowRoot!.querySelector(".draggable-item")!,
			keysButtons: use.element.shadowRoot!.querySelectorAll(".key")!
		}),
		triggerInput(data: Nub.Data.Key) {
			dispatchNubEvent()
				.atTarget(use.element)
				.input()
				.parseChannels(use.element.channels)
				.key(data)
				.fire()
		},
	}

	use.setup(setupWindowEvents(starters))

	const toggleEditor = () => {
		const editor = use.element.shadowRoot!.querySelector<HTMLElement>(".editor")!
		editor.toggleAttribute("opened")
	}

	return html`
		<div class=flex-box>
			${EditorView()}
			<div class="grid-box">
				${ToggleEditorButtonView(toggleEditor)}
				${DraggableContainerView(starters)}
				${ButtonsView(starters)}
			</div>
		</div>
	`
})
