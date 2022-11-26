import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"
import {AddBindButtonView} from "./add-bind-button.js"

export const KeybindsView = view(use => (
		[action, keycodes]: [string, string[]],
		i: number,
		handleKeyChange: (
				e: PointerEvent,
				i: number,
				indexOfKeyBind: number
			) => void,
		addNewKeyBind: (
				e: PointerEvent,
				i: number
			) => void
	) => {

	const keys = keycodes.map((keycode, indexOfKeyBind) => {
		const pointerdown = (e: PointerEvent) => handleKeyChange(
			e,
			i,
			indexOfKeyBind,
		)
		const label = keycode === ""
			? html`-`
			: keycode
		return html`
			<div
				class="bind"
				@pointerdown=${pointerdown}>
					<span class="key">${label}</span>
					<span class="info-key">press key</span>
			</div>
		`
	})

	return html`
		<div class="keybinds">
			${keys}
			${AddBindButtonView(i, addNewKeyBind)}
		</div>
	`
})
