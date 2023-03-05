
import {html} from "lit"
import {view} from "@chasemoskal/magical"

import {TextOptions} from "./text/text-options.js"
import {when} from "../../../tools/when.js"
import {bindings_to_text} from "../../context/bindings/text/bindings_to_text.js"
import {prepTextAreaChangeHandling} from "./text/prep-text-area-change-handling.js"

export const TextEditorPanelView = view({}, use => ({
		bindingsDraft,
		setBindingsDraft,
	}: TextOptions) => {

	const text = bindings_to_text(bindingsDraft)
	const [problem, setProblem] = use.state<string>("")

	const onTextAreaChange = prepTextAreaChangeHandling(
		setBindingsDraft,
		setProblem,
	)

	return html`
		<div data-panel=text-editor>

			<textarea @input=${onTextAreaChange}>${text}</textarea>

			${when(problem, () => html`
				<div class=problem>${problem}</div>
			`)}
		</div>
	`
})
