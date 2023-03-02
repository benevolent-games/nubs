
import {html} from "lit"
import {view} from "@chasemoskal/magical"

import {Setter} from "../../../framework/types/setter.js"
import {Bindings} from "../../context/bindings/types/bindings.js"
import {bindings_to_text} from "../../context/bindings/text/bindings_to_text.js"
import {prepTextAreaChangeHandling} from "./text/prep-text-area-change-handling.js"

export const TextEditorPanelView = view({}, use => ({
		bindingsDraft,
		setBindingsDraft,
	}: {
		bindingsDraft: Bindings
		setBindingsDraft: Setter<Bindings>
	}) => {

	const text = bindings_to_text(bindingsDraft)
	const [problem, setProblem] = use.state<string>("")
	const onTextAreaChange = prepTextAreaChangeHandling(
		setBindingsDraft,
		setProblem,
	)


	return html`
		<div data-panel=text-editor>

			<textarea @input=${onTextAreaChange}>${text}</textarea>

			${problem && html`
				<div class=problem>${problem}</div>
			`}
		</div>
	`
})
