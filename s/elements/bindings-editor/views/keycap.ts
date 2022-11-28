
import {html} from "lit"
import {stop} from "../../../tools/stop.js"
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
			<button
				class=keycap
				data-selected
				data-key=${keyIndex}>
					press key
			</button>
		`
		: html`
			<button
				class=keycap
				tabindex="0"
				data-key=${keyIndex}
				@click=${stop(onClickRebind)}>
					${code}
			</button>
		`
})
