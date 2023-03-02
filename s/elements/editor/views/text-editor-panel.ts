
import {html} from "lit"
import {view} from "@chasemoskal/magical"

import {Bindings} from "../../context/bindings/types/bindings.js"
import {text_to_bindings} from "../../context/bindings/text/text_to_bindings.js"
import {bindings_to_text} from "../../context/bindings/text/bindings_to_text.js"

export const TextEditorPanelView = view({}, use => ({
		bindings,
		onClickSave,
	}: {
		bindings: Bindings
		onClickSave: (draft: Bindings) => void
	}) => {

	const [problem, setProblem] = use.state<string>("")
	const [draft, setDraft] = use.state<undefined | Bindings>(undefined)

	function onTextAreaChange(event: InputEvent) {
		const target = <HTMLTextAreaElement>event.target
		setProblem("")
		setDraft(undefined)
		try {
			setDraft(
				text_to_bindings(target.value)
			)
		}
		catch (error) {
			if (error instanceof Error)
				setProblem(error.message)
		}
	}

	const text = bindings_to_text(bindings)
	const showSaveButton = (draft && !problem)
	const saveButtonHandler = showSaveButton
		? () => onClickSave(draft)
		: () => {}

	return html`
		<div data-panel=text-editor>
			<textarea @input=${onTextAreaChange}>${text}</textarea>

			${problem && html`
				<div class=problem>
					${problem}
				</div>
			`}

			<div class=buttons>
				<button
					?disabled=${!showSaveButton}
					@click=${saveButtonHandler}>
					save
				</button>
			</div>
		</div>
	`
})
