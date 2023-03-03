
import {html} from "lit"
import {view} from "@chasemoskal/magical"

export const ButtonsView = view({}, use => (
		showSaveButton: boolean,
		onSaveClick: () => void,
	) => {

	return html`
		<div class=buttons>
			${showSaveButton ?html`
				<button
					class=save
					@click=${onSaveClick}>
					save
				</button>
			` :undefined}
		</div>
	`
})
