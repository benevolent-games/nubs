
import {Setter} from "../../../../framework/types/setter.js"
import {Bindings2} from "../../../context/bindings/types/bindings.js"
import {text_to_bindings} from "../../../context/bindings/text/text_to_bindings.js"

export function prepTextAreaChangeHandling(
		setBindingsDraft: Setter<Bindings2>,
		setProblem: Setter<string>,
	) {

	return (event: InputEvent) => {
		const target = <HTMLTextAreaElement>event.target
		setProblem("")
		try {
			const newDraft = text_to_bindings(target.value)
			const isValid = !!newDraft
			if (isValid)
				setBindingsDraft(newDraft)
		}
		catch (error) {
			if (error instanceof Error)
				setProblem(error.message)
		}
	}
}
