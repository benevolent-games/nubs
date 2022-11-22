import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"
import {AddBindButtonView} from "./add-bind-button.js"

export const KeybindsView = view(use => (
	value: [string, string[][]],
	i: number,
	handleKeyChange: (e: PointerEvent, i: number, indexOfKeyBind: number) => void,
	addNewKeyBind: (e: PointerEvent, i: number) => void) => {

	return html`
		<div class="keybinds">${value[1].map(((keyBinds: unknown[]) => keyBinds.map((keyBind: unknown, indexOfKeyBind: number) => html`
			<div @pointerdown=${(e: PointerEvent) => handleKeyChange(e, i, indexOfKeyBind)} class="bind">
				<span class="key">${keyBind == '' ? html`-` : keyBind}</span>
				<span class="info-key">press key</span>
			</div>`)))}
			${AddBindButtonView(i, addNewKeyBind)}
		</div>`

	})
