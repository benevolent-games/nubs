
import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"

export const AddBindButtonView = view(use => (
		i: number,
		addNewKeyBind: (e: PointerEvent, i: number) => void,
	) => {

	return html`
		<div
			class=add-bind
			@pointerdown=${(e: PointerEvent) => addNewKeyBind(e, i)}>
			<span class=add-key>+</span>
			<span class=info-key>press key</span>
		</div>
	`
})
