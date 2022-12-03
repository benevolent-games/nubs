
import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"

import {Bindings} from "../../../bindings/types.js"
import {parseBindings} from "../../../bindings/parse.js"
import {buildBindings} from "../../../bindings/build.js"

export const TextEditorPanelView = view(use => ({
		bindings,
		onClickSave,
	}: {
		bindings: Bindings
		onClickSave: (draft: Bindings) => void
	}) => {

	const [error, setError] = use.state<undefined | Error>(undefined)
	const [draft, setDraft] = use.state<undefined | Bindings>(undefined)

	function onTextAreaChange(event: InputEvent) {
		const target = <HTMLTextAreaElement>event.target
		try {
			setDraft(
				parseBindings(target.value)
			)
		}
		catch (error) {
			if (error instanceof Error)
				setError(error)
		}
	}

	const text = buildBindings(bindings)

	return html`
		<div data-panel=text-editor>
			<textarea @input=${onTextAreaChange}>${text}</textarea>

			${error && html`
				<div class=error>
					${error.message}
				</div>
			`}

			<div class=buttons>
				${((draft && !error) && html`
					<button @click=${() => onClickSave(draft)}>
						save
					</button>
				`) || null}
			</div>
		</div>
	`
})
