
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

	return isSelected
		? html`
			<div
				class=keycap
				data-selected
				data-key=${keyIndex}>
					press key
			</div>
		`
		: html`
			<div
				class=keycap
				tabindex="0"
				data-key=${keyIndex}
				@click=${onClickRebind}>
					${code}
			</div>
		`
})
