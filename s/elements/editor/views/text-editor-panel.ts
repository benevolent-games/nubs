
import {html} from "lit"
import {view} from "@chasemoskal/magical"

import {Bindings} from "../../../bindings/types.js"
import {parseBindings} from "../../../bindings/parse.js"
import {buildBindings} from "../../../bindings/build.js"

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
				parseBindings(target.value)
			)
		}
		catch (error) {
			if (error instanceof Error)
				setProblem(error.message)
		}
	}

	const text = buildBindings(bindings)

	return html`
		<div data-panel=text-editor>
			<textarea @input=${onTextAreaChange}>${text}</textarea>

			${problem && html`
				<div class=problem>
					${problem}
				</div>
			`}

			<div class=buttons>
				${((draft && !problem) && html`
					<button @click=${() => onClickSave(draft)}>
						save
					</button>
				`) || null}
			</div>
		</div>
	`
})
