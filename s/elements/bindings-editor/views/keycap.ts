
import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"

export const KeycapView = view(use => ({
		code,
		keyIndex,
		isSelected,
		onClickRebind,
	}: {
		code: string
		keyIndex: number
		isSelected: boolean
		onClickRebind: (event: MouseEvent) => void
	}) => {

	return html`
		<div
			class=bind
			data-key-index=${keyIndex}
			?data-selected=${isSelected}
			@click=${onClickRebind}>

			${isSelected
				? html`<span class=info-key>press key</span>`
				: html`<span class=key>${code}</span>`}
		</div>
	`
})
